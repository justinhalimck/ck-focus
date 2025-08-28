const SubjectInfo = ({ code, name }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ marginTop: "20vh", color: "white" }}>You are working on</h1>
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
  );
};

export default SubjectInfo;
