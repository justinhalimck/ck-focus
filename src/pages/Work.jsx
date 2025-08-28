import { useState } from "react";
import CountdownTimer from "../components/CountdownTimer";
import SelectSubject from "../components/Work/SelectSubject";
import SubjectInfo from "../components/Work/SubjectInfo";

const Work = () => {
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
          <CountdownTimer duration={5} onComplete={() => setMode("rest")} />
        </>
      )}
      {mode === "rest" && (
        <>
          <div style={{ height: "90vh" }}>
            <SelectSubject
              onSelect={(code, name) => {
                setCode(code);
                setSubjectName(name);
              }}
            />
          </div>
          {code ? (
            <CountdownTimer duration={3} onComplete={() => setMode("work")} />
          ) : (
            <CountdownTimer duration={0} onComplete={() => { }} />
          )}
        </>
      )}
    </div>
  );
};

export default Work;
