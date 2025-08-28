import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useId } from "react";

const SelectSubject = ({ onSelect }) => {
  const labelId = useId();

  const SUBJECTS = {
    "00000": "Example Project 0",
    "00001": "Example Project 1",
    "00002": "Example Project 2",
    "00003": "Example Project 3",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id={labelId}>Select subject</InputLabel>
        <Select
          labelId={labelId}
          label="Select subject"
          onChange={(e) => onSelect(e.target.value, SUBJECTS[e.target.value])}
        >
          {Object.entries(SUBJECTS).map(([key, value]) => {
            return (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <h1 style={{ marginTop: "20vh" }}>Please select your subject.</h1>
    </div>
  );
};

export default SelectSubject;
