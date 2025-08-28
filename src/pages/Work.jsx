import { useState } from "react";
import CountdownTimer from "../components/CountdownTimer";
import SelectSubject from "../components/Work/SelectSubject";
import SubjectInfo from "../components/Work/SubjectInfo";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const WORK_DURATION = 7;
const REST_DURATION = 5;

const Work = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("rest");
  const [code, setCode] = useState(null);
  const [subjectName, setSubjectName] = useState(null);

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
            <SubjectInfo code={code} name={subjectName} />
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
            <SelectSubject
              currentCode={code}
              onSelect={(code, name) => {
                setCode(code);
                setSubjectName(name);
              }}
            />
            <Button
              onClick={() => navigate("/end")}
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
          {code ? (
            <CountdownTimer
              duration={REST_DURATION}
              onComplete={() => setMode("work")}
            />
          ) : (
            <CountdownTimer duration={0} onComplete={() => {}} />
          )}
        </>
      )}
    </div>
  );
};

export default Work;
