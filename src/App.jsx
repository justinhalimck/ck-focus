import { useEffect, useState } from "react";
import db from "./utils/indexeddb";
import { SWClient } from "./lib/sw";
import { postAlarm, subscribeUser } from "./lib/api";

function App() {
  const [count, setCount] = useState(0);
  const [dbData, setDbData] = useState([]);

  // Initialize database and load data
  useEffect(() => {
    const initDB = async () => {
      try {
        await db.init();
        const allData = await db.getAll();
        setDbData(allData);
        console.log("Loaded data from IndexedDB:", allData);
      } catch (error) {
        console.error("Failed to initialize IndexedDB:", error);
      }
    };

    initDB();
  }, []);

  useEffect(() => {
    if (count === 0) {
      subscribeUser();
      SWClient.update();
      return;
    }

    postAlarm(`my alarm ${count}`, `alarm body ${count}`, new Date().getTime() + 5000)

    // Store focus session data in IndexedDB
    const storeFocusSession = async () => {
      try {
        const sessionData = {
          type: "focus-session",
          value: {
            count: count,
            sessionTime: new Date().toISOString(),
            action:
              count === 1 ? "notification-requested" : "count-incremented",
          },
        };

        const id = await db.set(sessionData);
        console.log("Stored session data with ID:", id);

        // Refresh the data display
        const allData = await db.getAll();
        setDbData(allData);
      } catch (error) {
        console.error("Failed to store session data:", error);
      }
    };

    storeFocusSession();
  }, [count]);

  return (
    <>
      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <div className="card">
        <h2>IndexedDB Data</h2>
        <div style={{ marginBottom: "10px" }}>
          <button
            type="button"
            onClick={async () => {
              try {
                await db.clear();
                setDbData([]);
                console.log("Database cleared");
              } catch (error) {
                console.error("Failed to clear database:", error);
              }
            }}
            style={{ marginRight: "10px" }}
          >
            Clear Database
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                const allData = await db.getAll();
                setDbData(allData);
                console.log("Data refreshed:", allData);
              } catch (error) {
                console.error("Failed to refresh data:", error);
              }
            }}
            style={{ marginRight: "10px" }}
          >
            Refresh Data
          </button>
        </div>
        <div>
          <h3>Stored Items ({dbData.length})</h3>
          {dbData.length === 0 ? (
            <p>
              No data stored yet. Click the count button to store some data!
            </p>
          ) : (
            <ul
              style={{
                textAlign: "left",
                maxHeight: "200px",
                overflow: "auto",
              }}
            >
              {dbData.map((item) => (
                <li key={item.id} style={{ marginBottom: "5px" }}>
                  <strong>ID:</strong> {item.id} |<strong> Type:</strong>{" "}
                  {item.type} |<strong> Time:</strong>{" "}
                  {new Date(item.timestamp).toLocaleTimeString()} |
                  <strong> Data:</strong> {JSON.stringify(item.value)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
