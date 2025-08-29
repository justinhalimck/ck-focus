import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { SUBJECTS } from "../../utils/subjects";


const SelectSubject = ({ currentCode, onSelect, onGrowthCheck }) => {
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
        <div>
          {Object.entries(SUBJECTS).slice(0, 5).map((project) => 
            <div style={{
              display: "flex",
              width: "80vw",
              height: "47px",
              minWidth: "40px",
              padding: "4px 12px",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              borderRadius: "10px",
              background: "white",
              margin: "10px"
            }} 
              onClick={() => onGrowthCheck(project[0], project[1])}>
              Check {project[1]} growth
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectSubject;
