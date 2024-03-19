import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const DrawerComponent = () => {
  const location = useLocation();
  const drawerItems = [
    { text: "Dashboard", icon: <HomeIcon />, link: "/dashboard" },
    { text: "Users", icon: <PeopleAltIcon />, link: "/users" },
    { text: "Profile", icon: <PersonIcon />, link: "" },
    { text: "Register", icon: <PersonAddIcon />, link: "" },
    { text: "Notifications", icon: <NotificationsIcon />, link: "" },
    { text: "Setting", icon: <SettingsIcon />, link: "" },
  ];
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        flexShrink: 0,
        width: "15%",
        "& .MuiDrawer-paper": {
          width: "15%",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          marginTop: "auto",
          marginBottom: "auto",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "50px",
            marginBottom: "40px",
          }}
        >
          Material UI
        </Typography>
        <List>
          {drawerItems.map((item, index) => (
            <ListItem
              key={index}
              button
              component={Link}
              to={item.link}
              selected={location.pathname === item.link}
            >
              <ListItemIcon sx={{ color: "rgb(25, 118, 210)" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
