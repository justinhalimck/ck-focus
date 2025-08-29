import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import DrawerToggle from "../components/DrawerToggle";
import Logo from "../components/Icons/Logo";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", Math.floor(Math.random() * 1000));
    }
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(0deg, #D5E9EA 0%, #0074D9 100%)",
        }}
      >
        <DrawerToggle color="white" />
        <div
          style={{
            marginTop: "15vh",
            padding: "1em",
            color: "white",
            fontSize: "24px",
          }}
        >
          <Logo />
          <div
            style={{
              color: "white",
              fontSize: "40px",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            ポモドーロ
          </div>
          <div
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            Tadasi
          </div>
        </div>
        <Button
          onClick={() => navigate("/work")}
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

export default Home;
