/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Simple IndexedDB utility for Service Worker
const DB_NAME = 'CKFocusDB';
const DB_VERSION = 1;
const STORE_NAME = 'focusData';

class ServiceWorkerDB {
  constructor() {
    this.db = null;
  }

  async init() {
    if (this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('SW: Failed to open IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('SW: IndexedDB opened successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { 
            keyPath: 'id',
            autoIncrement: true 
          });
          
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('type', 'type', { unique: false });
          
          console.log('SW: Object store created');
        }
      };
    });
  }

  async set(data) {
    await this.init();
    
    const item = {
      ...data,
      timestamp: Date.now()
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(item);

      request.onsuccess = () => {
        console.log('SW: Data stored with ID:', request.result);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('SW: Failed to store data:', request.error);
        reject(request.error);
      };
    });
  }

  async getAll() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error('SW: Failed to get all data:', request.error);
        reject(request.error);
      };
    });
  }
}

const swDB = new ServiceWorkerDB();

// If the loader is already loaded, just stop.
console.log("SW: Service Worker loaded");

self.addEventListener("activate", async (ev) => {
  console.log("SW: ACTIVATED", ev);
  
  // Store activation event in IndexedDB
  try {
    await swDB.set({
      type: 'sw-event',
      value: {
        event: 'activate',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('SW: Failed to store activation event:', error);
  }
});

self.addEventListener("push", async (ev) => {
  console.log("SW: PUSHED", ev);
  
  // Store push event in IndexedDB
  try {
    await swDB.set({
      type: 'sw-event',
      value: {
        event: 'push',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('SW: Failed to store push event:', error);
  }
  
  self.registration.showNotification("PUSH NOTIF FROM SW", { body: "HEHE" });
});

self.addEventListener("message", async (ev) => {
  console.log("SW: MESSAGED", ev);
  
  // Store message event in IndexedDB
  try {
    await swDB.set({
      type: 'sw-event',
      value: {
        event: 'message',
        data: ev.data,
        timestamp: new Date().toISOString()
      }
    });
    
    // Log all stored data
    const allData = await swDB.getAll();
    console.log('SW: All stored data:', allData);
  } catch (error) {
    console.error('SW: Failed to store message event:', error);
  }

  setTimeout(() => {
    self.registration.showNotification("MESSAGE NOTIF FROM SW 2", {
      body: "HEHE2",
    });
  }, 3000);
});

console.log("SW: Service Worker script loaded completely");
