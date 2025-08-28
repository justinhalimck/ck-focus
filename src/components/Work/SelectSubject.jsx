import { Autocomplete, TextField } from "@mui/material";

const SUBJECTS = {
  "00000": "Example Project 0",
  "00001": "Example Project 1",
  "00002": "Example Project 2",
  "00003": "Example Project 3",
};

const SelectSubject = ({ onSelect }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Autocomplete
        disableClearable
        options={Object.entries(SUBJECTS).map(([k, v]) => ({
          label: v,
          code: k,
        }))}
        sx={{ margin: "2em", marginTop: "10vh", textAlign: "left" }}
        renderInput={(params) => (
          <TextField {...params} label="Select subject" />
        )}
        onChange={(_e, { code }) => onSelect(code, SUBJECTS[code])}
      />

      <h1 style={{ margin: "1em", marginTop: "20vh" }}>
        Please select your subject.
      </h1>
    </div>
  );
};

export default SelectSubject;
