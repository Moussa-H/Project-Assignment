import React from "react";
import UsersList from "../components/Users/UsersList";
import DrawerComponent from "../components/Navigation/DrawerComponent";
import AppBarComponent from "../components/Navigation/AppBarComponent";
import Box from "@mui/material/Box";

const UsersPage = () => {
  return (
    <div>
      <Box sx={{ display: "flex", height: "100vh", background: "#f4f7ff" }}>
        <DrawerComponent />
        <Box sx={{ flexGrow: 1 }}>
          <AppBarComponent />
          <UsersList />
        </Box>
      </Box>
    </div>
  );
};

export default UsersPage;
