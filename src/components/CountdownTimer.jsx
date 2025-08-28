import { useEffect, useState } from "react";

const CountdownTimer = ({ code, name, duration, onComplete }) => {
  const [remaining, setRemaining] = useState(duration);
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const timeLeft = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  useEffect(() => {
    let interval = null;
    if (remaining > 0) {
      interval = setInterval(() => {
        setRemaining((prev) => prev - 1);
      }, 1000);
    } else if (remaining === 0) {
      clearInterval(interval);
      onComplete();
    }
    return () => clearInterval(interval);
  }, [remaining, onComplete]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
          <div style={{ fontSize: "32px" }}>{code}</div>
          <div
            style={{
              height: "1px",
              background: "#E1E1F3",
              marginTop: "1em",
              marginBottom: "1em",
            }}
          ></div>
          <div style={{ fontSize: "14px" }}>{name}</div>
        </div>
      </div>
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
        {timeLeft}
      </div>
    </div>
  );
};

export default CountdownTimer;
