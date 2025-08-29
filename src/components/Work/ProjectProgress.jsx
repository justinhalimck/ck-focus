import { Autocomplete, TextField } from "@mui/material";
import tree_stage_1 from "../../assets/tree_stage_1.svg";
import tree_stage_2 from "../../assets/tree_stage_2.svg";
import tree_stage_3 from "../../assets/tree_stage_3.svg";
import tree_stage_4 from "../../assets/tree_stage_4.svg";
import back_arrow from "../../assets/circle-chevron-left.svg";
const SUBJECTS = {
  "00000": "Example Project 0",
  "00001": "Example Project 1",
  "00002": "Example Project 2",
  "00003": "Example Project 3",
};

const ProjectProgress = ({ code, subject }) => {
  return (
    <>
        <div style={{}}>
            <img src={back_arrow} alt="back" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ 
                color: "#28272C",
                fontSize: "24px",
                fontWeight: "600",
            }}>
                {subject}
            </div>
            <div style={{ 
                color: "#28272C",
                fontSize: "14px",
                fontWeight: "400",
            }}>
                Collaborative effort to master your task.
            </div>
            <div style={{
                width: "80vw",
                height: "82vw",
                flexShrink: 0,
                borderRadius: "10px",
                background: "white",
                boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.10)",
            }}>
                {code === "00000" && (<img src={tree_stage_1} alt="tree" style={{height: "20vw", marginTop: "52vw"}}/>)}
                {code === "00001" && (<img src={tree_stage_2} alt="tree" style={{height: "35vw", marginTop: "37vw"}}/>)}
                {code === "00002" && (<img src={tree_stage_3} alt="tree" style={{height: "50vw", marginTop: "22vw"}}/>)}
                {code === "00003" && (<img src={tree_stage_4} alt="tree" style={{height: "65vw", marginTop: "7vw"}}/>)}
            </div>
        
        </div>
    </>
  );
};

export default ProjectProgress;
