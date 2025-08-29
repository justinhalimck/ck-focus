import { Divider, IconButton, List, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BackIcon from "../assets/circle-chevron-left.svg";
import { Messages } from "../lib/messages";
import db from "../utils/indexeddb";
import { PROJECTS } from "../utils/projects";
import { formatTimeRecord } from "../utils/time";

const History = () => {
  const navigate = useNavigate();
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
    if (!groups[date]) groups[date] = {};
    if (!groups[date][record.code]) groups[date][record.code] = 0;
    groups[date][record.code] += record.elapsed;
  });

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
          <IconButton onClick={() => navigate(-1)}>
            <img src={BackIcon} alt="back" />
          </IconButton>
          <h1 style={{ margin: 0, marginLeft: "0.5em" }}>History</h1>
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
          <List>
            {Object.keys(groups).map((date) => {
              return (
                <>
                  <ListItemText primary={date} />
                  <Divider />
                  {Object.entries(groups[date]).map(([code, duration]) => {
                    return (
                      <ListItemText
                        key={crypto.randomUUID()}
                        primary={PROJECTS[code]}
                        secondary={`${code} - ${formatTimeRecord(duration)}`}
                      />
                    );
                  })}
                </>
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
};

export default History;
