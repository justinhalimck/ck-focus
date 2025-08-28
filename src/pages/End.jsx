import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import Logo from "../assets/end_image.svg";

const End = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(0deg, #DDEFFF 0%, #F8F8F8 100%)",
        }}
      >
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <img src={Logo} alt="Logo" style={{ width: "100vw"}} />
          <div
            style={{
              paddingTop: "7vh",
              width: "255px",
              color: "#28272C",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "normal",
            }}>
            You have finish todays work!
          </div>
        </div>
        <Button
          onClick={() => navigate("/")}
          sx={{
            marginTop: "7vh",
            width: "190px",
            height: "40px",
            minWidth: "40px",
            padding: "4px 12px",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            borderRadius: "40px",
            border: "1px solid #28272C",
            background: "white",

            color: "#282828",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px"
          }}
        >
          Restart work
        </Button>
      </div>
    </div>
  );
};

export default End;
