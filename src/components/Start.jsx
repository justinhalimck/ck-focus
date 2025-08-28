import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import Logo from "./Icons/Logo";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(0deg, #D5E9EA 0%, #0074D9 100%)",
        }}
      >
        <div style={{ marginTop: "20vh", color: "white", fontSize: "24px" }}>
          <Logo />
          <h1>ポモドーロ</h1>
          <h2>Tadasi</h2>
        </div>
        <Button
          onClick={() => navigate("/dashboard")}
          sx={{
            marginTop: "15vh",
            borderRadius: "40px",
            background: "#28272C",
            textTransform: "none",
            fontSize: "14px",
            color: "white",
            paddingX: "10vw",
          }}
        >
          Start working
        </Button>
      </div>
    </div>
  );
};

export default Start;
