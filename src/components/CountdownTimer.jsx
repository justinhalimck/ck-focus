import { useEffect, useState } from "react";

const CountdownTimer = ({ duration, onComplete }) => {
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
  );
};

export default CountdownTimer;
