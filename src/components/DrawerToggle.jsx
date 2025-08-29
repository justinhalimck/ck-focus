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

const DrawerToggle = ({ color }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div style={{ display: "flex", padding: "1em" }}>
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
        <div style={{ width: "50vw" }}>
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
