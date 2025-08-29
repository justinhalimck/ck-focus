const Messages = {
  PingRequest: 1000,
  PingResponse: 1001,
};

// Simple IndexedDB utility for Service Worker
const DB_NAME = "CKFocusDB";
const DB_VERSION = 1;
const STORE_NAME = "focusData";

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
        console.error("SW: Failed to open IndexedDB:", request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log("SW: IndexedDB opened successfully");
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });

          store.createIndex("timestamp", "timestamp", { unique: false });
          store.createIndex("type", "type", { unique: false });

          console.log("SW: Object store created");
        }
      };
    });
  }

  async set(data) {
    await this.init();

    const item = {
      ...data,
      timestamp: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(item);

      request.onsuccess = () => {
        console.log("SW: Data stored with ID:", request.result);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("SW: Failed to store data:", request.error);
        reject(request.error);
      };
    });
  }

  async getAll() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error("SW: Failed to get all data:", request.error);
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
      type: "sw-event",
      value: {
        event: "activate",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("SW: Failed to store activation event:", error);
  }
});

self.addEventListener("push", async (ev) => {
  console.log("SW: PUSHED", ev);

  // Store push event in IndexedDB
  try {
    await swDB.set({
      type: "sw-event",
      value: {
        event: "push",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("SW: Failed to store push event:", error);
  }
});

self.addEventListener("message", async (ev) => {
  console.log("SW: MESSAGED", ev);

  // Store message event in IndexedDB
  try {
    await swDB.set({
      type: "sw-event",
      value: {
        event: "message",
        data: ev.data,
        timestamp: new Date().toISOString(),
      },
    });

    // Log all stored data
    const allData = await swDB.getAll();
    console.log("SW: All stored data:", allData);
  } catch (error) {
    console.error("SW: Failed to store message event:", error);
  }
});

console.log("SW: Service Worker script loaded completely");
function displayNotification(title, body) {
  self.registration.showNotification(title, { body: body });
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close() // Close the notification

  // URL you want to open when notification is clicked
  const targetUrl = '/work'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // If the app is already open, focus it
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.focus()
            return
          }
        }
        // If not open, open a new window
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl)
        }
      })
  )
})

self.addEventListener("push", (ev) => {
  const data = ev.data.json();

  let description = "its time to take a break and choose your next project"
  if (data.title === "break")
    description = "Change projects or continue"

  if (data.title === "invite") {
    displayNotification("You're invited!", "Your friend invited you to CK Focus! Click to join.", data);
    console.log("Invitation notification displayed", data);
    return
  }

  displayNotification(data.title + " is ending!", description);
});

self.addEventListener("message", (ev) => {
  const message = ev.data;
  const messageID = message.messageID;
  const payload = message.body;

  handleMessage(messageID, payload);
});

// Currently for invitation only
self.addEventListener("notificationclick", async (ev) => {
  console.log("SW: Notification clicked", ev);
  
  // Close the notification
  ev.notification.close();
 
  // Get notification data
  const notificationData = ev.notification.data || {};
  const title = ev.notification.title;
  // if (!title.includes("invite") || notificationData.title !== "invite") {
  //   return;
  // }
  const targetUrl = "http://pomdoro.incin.net/join?id=" + (notificationData.body?.id || '');
  // Store click event in IndexedDB
  try {
    await swDB.set({
      type: "sw-event",
      value: {
        event: "notificationclick",
        title: title,
        data: notificationData,
        targetUrl: targetUrl,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("SW: Failed to store notification click event:", error);
  }
  
  // Handle the click - open window or focus existing one
  ev.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window open
      for (const client of clientList) {
        if (client.url.includes(self.location.origin)) {
          // Focus existing window and navigate to target URL
          return client.focus().then(() => {
            return client.navigate(targetUrl);
          });
        }
      }
    })
  );

  // No existing window, open a new one
  return self.clients.openWindow(targetUrl);
});

function handleMessage(messageID, payload) {
  switch (messageID) {
    case Messages.PingRequest:
      displayNotification("PING", "PONG");
      break;
    default:
      console.log("unhandled message", messageID, payload);
  }
}
