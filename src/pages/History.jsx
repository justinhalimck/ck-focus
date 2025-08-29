import { useEffect, useState } from "react";
import HistoryIcon from "../components/Icons/HistoryIcon";
import { Messages } from "../lib/messages";
import db from "../utils/indexeddb";
import { SUBJECTS } from "../utils/subjects";
import { formatTimeRecord } from "../utils/time";

const History = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    db.init()
      .then(() => db.getAll())
      .then((arr) =>
        arr
          .filter((event) => event.value.event === "message")
          .filter(
            (event) => event.value.data.messageID === Messages.SaveTimeRecord,
          )
          .map((event) => event.value.data.body),
      )
      .then(setData);
  }, []);

  const groups = {};
  data.forEach((record) => {
    const date = record.start.toISOString().slice(0, 10);
    if (!groups[date]) groups[date] = [];
    groups[date].push(record);
  });
  console.log(groups);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: "100vh",
          padding: "1em",
          textAlign: "left",
          background: "linear-gradient(180deg, #DDEFFF 0%, #F8F8F8 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ margin: "1em" }}>
            <HistoryIcon />
          </div>
          <h1 style={{ margin: 0 }}>History</h1>
        </div>
        <div
          style={{
            maxHeight: "80vh",
            margin: "1em",
            padding: "1em",
            borderRadius: "4px",
            background: "white",
            textAlign: "left",
            overflowY: "auto",
          }}
        >
          {Object.keys(groups).map((date) => {
            return (
              <>
                <div style={{ fontWeight: "bold" }}>{date}</div>
                <div style={{ height: 1, background: "#E1E1F3" }}></div>
                {groups[date].map((record) => {
                  return (
                    <div
                      key={crypto.randomUUID()}
                      style={{ marginTop: "0.5em" }}
                    >
                      {record.code} {SUBJECTS[record.code]} (
                      {formatTimeRecord(record.elapsed)})
                    </div>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
