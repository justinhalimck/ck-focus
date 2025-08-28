import { useState, useEffect } from "react";

const WORK_DURATION = 5;
const BREAK_DURATION = 10;

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

const LOCAL_STORAGE_KEY = "selectedTask";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("break");
  const [selectedTask, setSelectedTask] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || "None";
  });
  const saveSelectedTask = (task) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, task);
  };

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const newMode = mode === "work" ? "break" : "work";
            setMode(newMode);
            setTimeLeft(newMode === "work" ? WORK_DURATION : BREAK_DURATION);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [mode, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(WORK_DURATION);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const handleTaskChange = (e) => {
    saveSelectedTask(e.target.value);
    setSelectedTask(e.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {mode === "work" && (
        <div
          style={{
            height: "90vh",
            background: "linear-gradient(0deg, #D5E9EA 0%, #0074D9 100%)",
          }}
        >
          <h1 style={{ marginTop: "20vh", color: "white" }}>
            You are working on
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "10px",
              background: "white",
              margin: "1em",
              padding: "2em",
              color: "#535D6E",
            }}
          >
            <div style={{ fontSize: "32px" }}>000000</div>
            <div
              style={{
                height: "1px",
                background: "#E1E1F3",
                marginTop: "1em",
                marginBottom: "1em",
              }}
            ></div>
            <div style={{ fontSize: "14px" }}>{selectedTask}</div>
          </div>
        </div>
      )}
      {mode === "break" && (
        <div style={{ textAlign: "center" }}>
          <h2>{mode === "work" ? "Work Session" : "Break Time"}</h2>

          {(mode === "break" || !isRunning) && (
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="break-task">Choose next activity: </label>
              <select
                id="break-task"
                value={selectedTask}
                onChange={handleTaskChange}
              >
                <option value="Relax">Relax</option>
                <option value="Stretch">Stretch</option>
                <option value="Drink Water">Drink Water</option>
                <option value="Check Email">Check Email</option>
                <option value="Meditate">Meditate</option>
              </select>
            </div>
          )}

          {mode === "work" && isRunning && (
            <div
              style={{
                marginBottom: "1rem",
                fontStyle: "italic",
                color: "#555",
              }}
            >
              Current activity: <strong>{selectedTask}</strong>
            </div>
          )}

          {mode === "work" && !isRunning && (
            <button onClick={handleStart} disabled={selectedTask === "None"}>
              Start
            </button>
          )}
          <button onClick={handleReset} style={{ marginLeft: "10px" }}>
            Reset
          </button>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
          background: "#FFE3E3",
          fontSize: "32px",
          fontWeight: 600,
        }}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;
