import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CountdownTimer from "../components/CountdownTimer";
import SelectSubject from "../components/Work/SelectSubject";
import SubjectInfo from "../components/Work/SubjectInfo";
import { Messages } from "../lib/messages";
import { SWClient } from "../lib/sw";
import db from "../utils/indexeddb";

const WORK_DURATION = 7;
const REST_DURATION = 5;

const Work = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("rest");
  const [currentCode, setCurrentCode] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [nextCode, setNextCode] = useState(null);
  const [nextSubject, setNextSubject] = useState(null);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    db.init();
    SWClient.update();
  });

  const startWork = () => {
    if (currentCode && currentCode !== nextCode) {
      saveTimeRecord();
      setStartTime(Date.now());
    }
    setCurrentCode(nextCode);
    setCurrentSubject(nextSubject);
    setMode("work");
  };

  const endWork = () => {
    if (currentCode) {
      saveTimeRecord();
      setCurrentCode(null);
      setCurrentSubject(null);
      setNextCode(null);
      setNextSubject(null);
    }
    navigate("/end");
  };

  const saveTimeRecord = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    SWClient.post(Messages.SaveTimeRecord, { code: currentCode, elapsed });
  };

  const changeCode = (newCode, newSubject) => {
    setNextCode(newCode);
    setNextSubject(newSubject);
    if (!currentCode) {
      setStartTime(Date.now());
      startWork();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background:
          mode === "work"
            ? "linear-gradient(0deg, #D5E9EA 0%, #0074D9 100%)"
            : "linear-gradient(180deg, #DDEFFF 2.4%, #F8F8F8 100%)",
      }}
    >
      {mode === "work" && (
        <>
          <div style={{ height: "90vh" }}>
            <SubjectInfo code={currentCode} name={currentSubject} />
          </div>
          <CountdownTimer
            duration={WORK_DURATION}
            onComplete={() => setMode("rest")}
          />
        </>
      )}
      {mode === "rest" && (
        <>
          <div style={{ height: "90vh" }}>
            <SelectSubject currentCode={currentCode} onSelect={changeCode} />
            <Button
              onClick={endWork}
              sx={{
                marginTop: "15vh",
                borderRadius: "40px",
                background: "#28272C",
                textTransform: "none",
                fontSize: "14px",
                paddingX: "10vw",
                color: "white",
              }}
            >
              Stop working
            </Button>
          </div>
          {currentCode ? (
            <CountdownTimer duration={REST_DURATION} onComplete={startWork} />
          ) : (
            <CountdownTimer duration={0} onComplete={() => { }} />
          )}
        </>
      )}
    </div>
  );
};

export default Work;
