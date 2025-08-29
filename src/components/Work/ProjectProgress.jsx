import { Autocomplete, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import tree_stage_1 from "../../assets/tree_stage_1.svg";
import tree_stage_2 from "../../assets/tree_stage_2.svg";
import tree_stage_3 from "../../assets/tree_stage_3.svg";
import tree_stage_4 from "../../assets/tree_stage_4.svg";
import UserList from "../../components/users/UserList";

const ProjectProgress = ({ code, project }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          color: "#28272C",
          fontSize: "24px",
          fontWeight: "600",
          width: "90vw",
        }}
      >
        {project}
      </div>
      <div
        style={{
          color: "#28272C",
          fontSize: "14px",
          fontWeight: "400",
          margin: "4vw",
        }}
      >
        Collaborative effort to master your task.
      </div>
      <div
        style={{
          width: "80vw",
          height: "82vw",
          flexShrink: 0,
          borderRadius: "10px",
          background: "white",
          boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.10)",
        }}
      >
        {code === "933251" && (
          <img
            src={tree_stage_1}
            alt="tree"
            style={{ height: "20vw", marginTop: "52vw" }}
          />
        )}
        {code === "933264" && (
          <img
            src={tree_stage_2}
            alt="tree"
            style={{ height: "35vw", marginTop: "37vw" }}
          />
        )}
        {code === "933255" && (
          <img
            src={tree_stage_3}
            alt="tree"
            style={{ height: "50vw", marginTop: "22vw" }}
          />
        )}
        {code === "902294" && (
          <img
            src={tree_stage_4}
            alt="tree"
            style={{ height: "65vw", marginTop: "7vw" }}
          />
        )}
        {code === "953277" && (
          <img
            src={tree_stage_3}
            alt="tree"
            style={{ height: "50vw", marginTop: "22vw" }}
          />
        )}
        {code === "943215" && (
          <img
            src={tree_stage_2}
            alt="tree"
            style={{ height: "35vw", marginTop: "37vw" }}
          />
        )}
        {code === "923303" && (
          <img
            src={tree_stage_3}
            alt="tree"
            style={{ height: "50vw", marginTop: "22vw" }}
          />
        )}
        {code === "943226" && (
          <img
            src={tree_stage_3}
            alt="tree"
            style={{ height: "50vw", marginTop: "22vw" }}
          />
        )}
      </div>
      <div
        style={{
          color: "#28272C",
          fontSize: "14px",
          fontWeight: 600,
          textAlign: "left",
          width: "80vw",
          margin: "2vw",
        }}
      >
        Current Level
      </div>
      <div
        style={{
          color: "#28272C",
          fontSize: "14px",
          fontWeight: 400,
          display: "flex",
          justifyContent: "space-between",
          width: "80vw",
        }}
      >
        <div>
          {code === "933251" && "Level 1: Seedling"}
          {code === "933264" && "Level 2: Sprout"}
          {code === "933255" && "Level 3: Sapling"}
          {code === "902294" && "Level 4: Young Tree"}
          {code === "953277" && "Level 3: Sapling"}
          {code === "943215" && "Level 2: Sprout"}
          {code === "923303" && "Level 3: Sapling"}
          {code === "943226" && "Level 3: Sapling"}
        </div>
        <div>
          {code === "933251" && "10 hours"}
          {code === "933264" && "50 hours"}
          {code === "933255" && "100 hours"}
          {code === "902294" && "300 hours"}
          {code === "953277" && "100 hours"}
          {code === "943215" && "50 hours"}
          {code === "923303" && "100 hours"}
          {code === "943226" && "100 hours"}
        </div>
      </div>
      <Divider sx={{ width: "80vw", bgcolor: "#28272C", marginTop: "2vh" }} />
      <div
        style={{
          color: "#28272C",
          fontSize: "14px",
          fontWeight: 600,
          marginTop: "4vw",
          width: "80vw",
          textAlign: "left",
        }}
      >
        Top Contributors
      </div>
      <UserList projectCode={code} showSelf={true} />
    </div>
  );
};

export default ProjectProgress;
