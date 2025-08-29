import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import HamburgerIcon from "./Icons/HamburgerIcon";
import BackIcon from "../assets/circle-chevron-left.svg";

const DrawerToggle = ({ color, onBack }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div style={{ display: "flex", height:"10vh", padding: "0 8vw 0 8vw" }}>
        {onBack && (
          <IconButton onClick={onBack} >
            <img src={BackIcon} alt="back"/>
          </IconButton>
        )}
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{ marginLeft: "auto", color }}
        >
          <HamburgerIcon />
        </IconButton>
      </div>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div style={{ width: "12em" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/history")}>
                <ListItemText primary="History" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerToggle;
