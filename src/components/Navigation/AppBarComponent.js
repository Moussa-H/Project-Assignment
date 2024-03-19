import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";


const AppBarComponent = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <AppBar position="sticky" sx={{ flexShrink: 0, width: "100%" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome {username}
        </Typography>
        {isAuthenticated && (
          <>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              component={Link}
              to="/login"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
