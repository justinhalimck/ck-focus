import { Avatar, Button, Divider, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import BackIcon from "../assets/circle-chevron-left.svg";
import { getUsers, postInvite } from "../lib/api";

const Invite = ({ userName, project }) => {
  const navigate = useNavigate();

  const handleInvite = async () => {
    const usersRes = await getUsers()
    const invitee = usersRes.users[0]
    await postInvite('invite-1', invitee.id);
    alert(`invitation sent to ${invitee.firstName} ${invitee.lastName}`);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          textAlign: "left",
          background: "linear-gradient(180deg, #DDEFFF 0%, #F8F8F8 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "1em" }}>
          <IconButton onClick={() => navigate(-1)}>
            <img src={BackIcon} alt="back" />
          </IconButton>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <Avatar sx={{ height: "5em", width: "5em" }} />
          <div style={{ marginY: "8px", textAlign: "center" }}>
            <div style={{ marginTop: "8px" }}>PM</div>
            <div style={{ marginTop: "8px", fontWeight: "bold" }}>
              {userName}
            </div>
            <div>user.name@company.com</div>
            <div style={{ marginTop: "8px" }}>Department</div>
          </div>
          <Divider sx={{ marginY: "16px", width: "70vw" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            background: "white",
          }}
        >
          <div style={{ marginTop: "4em" }}>
            You will invite{" "}
            <span style={{ fontWeight: "bold" }}>{userName}</span> to the
            project:
          </div>
          <h1 style={{ margin: 0 }}>{project}</h1>
          <div style={{ marginTop: "3em" }}>
            <Button
              variant="outlined"
              color="black"
              sx={{
                paddingX: "3em",
                borderRadius: "40px",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                marginLeft: "8px",
                paddingX: "3em",
                borderRadius: "40px",
                background: "black",
                textTransform: "none",
              }}
              onClick={handleInvite}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invite;
