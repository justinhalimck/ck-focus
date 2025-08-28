import CountdownTimer from "../components/CountdownTimer";
import SubjectInfo from "../components/Work/SubjectInfo";

const Work = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: "90vh",
          background: "linear-gradient(0deg, #D5E9EA 0%, #0074D9 100%)",
        }}
      >
        <SubjectInfo code="000000" name="Example Project" />
      </div>
      <CountdownTimer duration={10} onComplete={() => { }} />
    </div>
  );
};

export default Work;
