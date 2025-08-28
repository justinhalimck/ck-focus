/**
 * Simple IndexedDB utility that works in both main thread and service worker
 */

const DB_NAME = 'CKFocusDB';
const DB_VERSION = 1;
const STORE_NAME = 'focusData';

class IndexedDB {
  constructor() {
    this.db = null;
  }

  /**
   * Initialize the database
   * @returns {Promise<IDBDatabase>}
   */
  async init() {
    if (this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB opened successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { 
            keyPath: 'id',
            autoIncrement: true 
          });
          
          // Create indexes for common queries
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('type', 'type', { unique: false });
          
          console.log('Object store created');
        }
      };
    });
  }

  /**
   * Store data in the database
   * @param {Object} data - Data to store
   * @param {string} data.type - Type of data (e.g., 'focus-session', 'settings')
   * @param {*} data.value - The actual data
   * @returns {Promise<number>} The ID of the stored item
   */
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
        console.log('Data stored with ID:', request.result);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('Failed to store data:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Get data by ID
   * @param {number} id - The ID of the item to retrieve
   * @returns {Promise<Object|null>}
   */
  async get(id) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        console.error('Failed to get data:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Get all items of a specific type
   * @param {string} type - The type to filter by
   * @returns {Promise<Array>}
   */
  async getByType(type) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('type');
      const request = index.getAll(type);

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error('Failed to get data by type:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Get all items
   * @returns {Promise<Array>}
   */
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
        console.error('Failed to get all data:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Update an existing item
   * @param {number} id - The ID of the item to update
   * @param {Object} updates - The updates to apply
   * @returns {Promise<Object>}
   */
  async update(id, updates) {
    await this.init();

    const existing = await this.get(id);
    if (!existing) {
      throw new Error(`Item with ID ${id} not found`);
    }

    const updated = {
      ...existing,
      ...updates,
      timestamp: Date.now()
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(updated);

      request.onsuccess = () => {
        console.log('Data updated with ID:', request.result);
        resolve(updated);
      };

      request.onerror = () => {
        console.error('Failed to update data:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Delete an item by ID
   * @param {number} id - The ID of the item to delete
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log('Data deleted with ID:', id);
        resolve(true);
      };

      request.onerror = () => {
        console.error('Failed to delete data:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Clear all data
   * @returns {Promise<boolean>}
   */
  async clear() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        console.log('All data cleared');
        resolve(true);
      };

      request.onerror = () => {
        console.error('Failed to clear data:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Close the database connection
   */
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log('Database connection closed');
    }
  }
}

// Create a singleton instance
const db = new IndexedDB();

export default db;

// Named exports for convenience
export const {
  init,
  set,
  get,
  getByType,
  getAll,
  update,
  delete: deleteItem,
  clear,
  close
} = db;
