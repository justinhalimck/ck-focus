import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import background_image from "../assets/select_proj_background.svg";
import CountdownTimer from "../components/CountdownTimer";
import SelectSubject from "../components/Work/SelectSubject";
import SubjectInfo from "../components/Work/SubjectInfo";
import { postAlarm, subscribeUser } from "../lib/api";
import { Messages } from "../lib/messages";
import { SWClient } from "../lib/sw";
import db from "../utils/indexeddb";
import { timeAfterSeconds } from "../lib/utils";

const WORK_DURATION = 7;
const REST_DURATION = 5;
const NOTIFICATION_DELAY = 3;

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
    subscribeUser();

    if(!localStorage.getItem('user')) {
      localStorage.setItem('user', Math.floor(Math.random() * 1000))
    }
  }, []);

  const startWork = () => {
    if (currentCode && currentCode !== nextCode) {
      saveTimeRecord();
      setStartTime(Date.now());
    }
    if (nextCode) {
      setCurrentCode(nextCode);
      setCurrentSubject(nextSubject);
      setMode("work");
      postAlarm(
        nextSubject ?? " ",
        nextCode ?? " ",
        timeAfterSeconds(WORK_DURATION - NOTIFICATION_DELAY),
      );
    }
  };

  const endWork = () => {
    if (currentCode) {
      saveTimeRecord();
    }
    navigate("/end");
  };

  const saveTimeRecord = () => {
    const start = new Date(startTime);
    const end = new Date();
    const elapsed = Math.floor((end - start) / 1000);
    SWClient.post(Messages.SaveTimeRecord, {
      code: currentCode,
      start,
      end,
      elapsed,
    });
  };

  const changeCode = (code, subject) => {
    setNextCode(code);
    setNextSubject(subject);
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
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          mode === "work"
            ? "linear-gradient(0deg, #D5E9EA 0%, #0074D9 100%)"
            : currentCode 
              ? "linear-gradient(180deg, #DDEFFF 2.4%, #F8F8F8 100%)"
              : `url(${background_image}), linear-gradient(180deg, #DDEFFF 2.4%, #F8F8F8 100%)`,
      }}
    >
      {mode === "work" && (
        <>
          <div style={{ height: "90vh" }}>
            <SubjectInfo code={currentCode} name={currentSubject} />
          </div>
          <CountdownTimer
            duration={WORK_DURATION}
            onComplete={() => {setMode("rest"); postAlarm("break", " ", timeAfterSeconds(REST_DURATION - NOTIFICATION_DELAY))}}
          />
        </>
      )}
      {mode === "rest" && (
        <>
          <div style={{ height: "90vh" }}>
            <SelectSubject currentCode={currentCode} onSelect={changeCode} />
            {currentCode && <Button
              onClick={endWork}
              sx={{
                marginTop: "10vh",
                borderRadius: "40px",
                background: "#28272C",
                textTransform: "none",
                fontSize: "14px",
                paddingX: "10vw",
                color: "white",
              }}
            >
              Stop working
            </Button>}
          </div>
          {nextCode ? (
            <CountdownTimer
              duration={REST_DURATION}
              onComplete={() => startWork(nextCode, nextSubject)}
            />
          ) : (
            <CountdownTimer duration={0} onComplete={() => { }} />
          )}
        </>
      )}
    </div>
  );
};

export default Work;
