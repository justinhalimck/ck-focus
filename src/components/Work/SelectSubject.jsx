import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import tree_stage_1 from "../../assets/tree_stage_1.svg";
import tree_stage_2 from "../../assets/tree_stage_2.svg";
import tree_stage_3 from "../../assets/tree_stage_3.svg";
import tree_stage_4 from "../../assets/tree_stage_4.svg";
import { SUBJECTS } from "../../utils/subjects";

const SelectSubject = ({ currentCode, onSelect }) => {
  const [code, setCode] = useState(currentCode);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Autocomplete
        disableClearable
        options={Object.entries(SUBJECTS).map(([k, v]) => ({
          label: `${k} ${v}`,
          code: k,
        }))}
        sx={{ textAlign: "left", width: "80vw" }}
        value={code && `${code} ${SUBJECTS[code]}`}
        renderInput={(params) => (
          <TextField {...params} label="Select subject" />
        )}
        onChange={(_e, { code }) => {
          onSelect(code, SUBJECTS[code]);
          setCode(code);
        }}
      />

      {!currentCode && (
        <h1 style={{ margin: "1em", marginTop: "25vh" }}>
          Please select your subject.
        </h1>
      )}
      {currentCode && (
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
          {currentCode === "00000" && (
            <img
              src={tree_stage_1}
              alt="tree"
              style={{ height: "20vw", marginTop: "52vw" }}
            />
          )}
          {currentCode === "00001" && (
            <img
              src={tree_stage_2}
              alt="tree"
              style={{ height: "35vw", marginTop: "37vw" }}
            />
          )}
          {currentCode === "00002" && (
            <img
              src={tree_stage_3}
              alt="tree"
              style={{ height: "50vw", marginTop: "22vw" }}
            />
          )}
          {currentCode === "00003" && (
            <img
              src={tree_stage_4}
              alt="tree"
              style={{ height: "65vw", marginTop: "7vw" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectSubject;
