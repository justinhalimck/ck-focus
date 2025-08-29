import { useEffect, useState } from "react";
import { Messages } from "../lib/messages";
import db from "../utils/indexeddb";

const History = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    db.init()
      .then(() => db.getAll())
      .then((arr) =>
        arr
          .filter(
            (event) => event.value.data.messageID === Messages.SaveTimeRecord,
          )
          .map((event) => event.value.data.body),
      )
      .then(setData);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(180deg, #DDEFFF 0%, #F8F8F8 100%)",
        }}
      >
        <h1>History</h1>
        <div
          style={{
            maxHeight: "80vh",
            margin: "1em",
            borderRadius: "4px",
            background: "white",
            textAlign: "left",
            overflowY: "auto",
          }}
        >
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 10 }}>
            {JSON.stringify(data, 2, null)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default History;
