import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import background_image from "../assets/select_proj_background.svg";
import CountdownTimer from "../components/CountdownTimer";
import DrawerToggle from "../components/DrawerToggle";
import ProjectProgress from "../components/Work/ProjectProgress";
import SelectProject from "../components/Work/SelectProject";
import ProjectInfo from "../components/Work/ProjectInfo";
import { deleteAlarm, postAlarm, subscribeUser } from "../lib/api";
import { Messages } from "../lib/messages";
import { SWClient } from "../lib/sw";
import { timeAfterSeconds } from "../lib/utils";
import db from "../utils/indexeddb";

const WORK_DURATION = 60;
const REST_DURATION = 30;
const NOTIFICATION_DELAY = 3;

const Work = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("rest");
  const [growthCheckCode, setGrowthCheckCode] = useState(null);
  const [growthCheckProject, setGrowthCheckProject] = useState(null);
  const [currentCode, setCurrentCode] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [nextCode, setNextCode] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    db.init();
    SWClient.update();
    subscribeUser();

    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", Math.floor(Math.random() * 1000));
    }
  }, []);

  const startWork = () => {
    if (currentCode && currentCode !== nextCode) {
      saveTimeRecord();
      setStartTime(Date.now());
      setGrowthCheckCode(null);
    }
    if (nextCode) {
      setCurrentCode(nextCode);
      setCurrentProject(nextProject);
      setMode("work");
      setGrowthCheckCode(null);
      postAlarm(
        nextProject ?? " ",
        nextCode ?? " ",
        timeAfterSeconds(WORK_DURATION - NOTIFICATION_DELAY),
      );
    }
  };

  const endWork = () => {
    if (currentCode) {
      saveTimeRecord();
    }
    deleteAlarm();
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

  const changeCode = (code, project) => {
    setNextCode(code);
    setNextProject(project);
    if (!currentCode) {
      setStartTime(Date.now());
      startWork();
    }
  };

  const growthCheck = (code, project) => {
    setGrowthCheckCode(code);
    setGrowthCheckProject(project);
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
          <DrawerToggle color="white" />
          <div style={{ height: "90vh" }}>
            <ProjectInfo code={currentCode} name={currentProject} />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100vw",
              zIndex: 0,
            }}
          >
            <CountdownTimer
              variant="red"
              duration={WORK_DURATION}
              onComplete={() => {
                setMode("rest");
                postAlarm(
                  "break",
                  " ",
                  timeAfterSeconds(REST_DURATION - NOTIFICATION_DELAY),
                );
              }}
            />
          </div>
        </>
      )}
      {mode === "rest" && (
        <>
          {growthCheckCode ? (
            <>
              <DrawerToggle
                color="black"
                onBack={() => setGrowthCheckCode(null)}
              />
              <div style={{ height: "90vh" }}>
                <ProjectProgress
                  code={growthCheckCode}
                  project={growthCheckProject}
                  onBack={() => setGrowthCheckCode(null)}
                />
              </div>
            </>
          ) : (
            <>
              <DrawerToggle color="black" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "90vh",
                }}
              >
                <div>
                  <SelectProject
                    currentCode={currentCode}
                    onSelect={changeCode}
                    onGrowthCheck={growthCheck}
                  />
                  {currentCode && (
                    <Button
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
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
          <div style={{ position: "absolute", bottom: 0, width: "100vw" }}>
            {nextCode ? (
              <CountdownTimer
                variant="green"
                duration={REST_DURATION}
                onComplete={() => startWork(nextCode, nextProject)}
              />
            ) : (
              <CountdownTimer
                variant="green"
                duration={0}
                onComplete={() => { }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Work;
