import { useEffect, useState } from "react";
import { formatTime } from "../utils/time";

const CountdownTimer = ({ duration, onComplete }) => {
  const [remaining, setRemaining] = useState(duration);
  const timeLeft = formatTime(remaining);

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
        color: "#FF5656",
        fontSize: "32px",
        fontWeight: 600,
      }}
    >
      {timeLeft}
    </div>
  );
};

export default CountdownTimer;
