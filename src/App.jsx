import { useEffect, useState } from "react";
import Timer from "./components/Timer";
import "./App.css";
import { CssBaseline } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) return;
    if (count === 1) {
      navigator.serviceWorker.getRegistration().then((r) => r?.update());
      Notification.requestPermission().then((res) => {
        console.log(res);
      });
      return;
    }
    (() => {
      navigator.serviceWorker.controller?.postMessage("push");
    })();
    setTimeout(() => {
      new Notification("Notif from main", { body: "NOTIF BODY" });
    }, [3000]);
  }, [count]);

  return (
    <>
      <CssBaseline />
      <h1>CK FOCUS</h1>
      <Timer />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
