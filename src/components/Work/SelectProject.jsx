import { Box, Button, Menu, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { PROJECTS } from "../../utils/projects";
import ExpandMore from "@mui/icons-material/ExpandMore";

const SelectProject = ({ currentCode, onSelect, onGrowthCheck }) => {
  const [code, setCode] = useState(currentCode);
  const [selectProjectAnchorEl, setSelectProjectAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState(null)

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{
        width: '80vw',
        height: '32px',
        display: 'flex',
        gap: '2px',
        ':hover > *': {
          backgroundColor: '#0088FF'
        },
        ':hover svg': {
          rotate: '0deg'
        }
      }}
      onClick={(e) => setSelectProjectAnchorEl(e.currentTarget)}
      >
        <Button
          variant="contained"
          disableElevation
          fullWidth
          sx={{
            backgroundColor: '#0074D9',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
            borderTopLeftRadius: '100px',
            borderBottomLeftRadius: '100px',
            fontSize: '14px',
          }}
        >
          <Typography textTransform={'none'}>Select subject</Typography>
        </Button>
        <Box sx={{
          display: 'flex',
          alignItems:'center',
          justifyContent: 'center',
          backgroundColor: '#0074D9',
          width: '45px',
          borderTopRightRadius: '100px',
          borderBottomRightRadius: '100px'
        }}>
          <ExpandMore htmlColor="white" sx={{
          rotate: '180deg'
          }}/>
        </Box>
      </Box>
      <Menu 
        open={selectProjectAnchorEl} 
        anchorEl={selectProjectAnchorEl}
        onClose={() => setSelectProjectAnchorEl(null)} 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          width: '90vw',
          height: '70vh',
          minHeight: '70vh',
          borderRadius: '10px',
          transform: 'translateY(110px)',
          pl: 1,
          pr: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
        >
          <TextField 
            size="small"
            sx={{
              width: '95%',
              ml: 0.8,
              height: '10%'
            }}
            onChange={(e) => setSearchText(e.target.value)}
          >
          </TextField>
          <Box sx={{
            height: '90%',
            maxHeight: '90%',
            overflow: 'auto'
          }}>
            {Object.entries(PROJECTS).map(([k ,v]) => {
              if (searchText && searchText.length > 0 && (!(k + v).toLocaleLowerCase().includes(searchText)))
                return;
              return (
                <Box 
                  key={k} 
                  sx={{
                    display: 'flex',
                    gap: 1,
                    pl: 1,
                    pr: 1,
                    pb: 1,
                    minHeight: '20px',
                    mb: 1,
                  }}
                  onClick={() => {
                    onSelect(k, PROJECTS[k]);
                    setCode(k);
                    setSelectProjectAnchorEl(null);
                  }}
                >
                  <Typography>{k} {v}</Typography>
                </Box>
              )
            })}
          </Box>
      </Menu>
        {!currentCode && (
          <h1 style={{ margin: "1em", marginTop: "25vh" }}>
            Please select your project.
          </h1>
        )}
        {currentCode && (
          <div>
            {Object.entries(PROJECTS)
              .slice(0, 5)
              .map((project) => (
                <div
                  style={{
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
                    margin: "10px",
                  }}
                  onClick={() => onGrowthCheck(project[0], project[1])}
                >
                  Check {project[1]} growth
                </div>
              ))}
          </div>
        )}
    </div>
  );
};

export default SelectProject;
