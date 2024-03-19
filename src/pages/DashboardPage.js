import React from "react";
import AppBarComponent from "../components/Navigation/AppBarComponent";
import DrawerComponent from "../components/Navigation/DrawerComponent";
import Dashboard from "../components/Dashboard/Dashboard";
import Box from "@mui/material/Box";

const DashboardPage = () => {
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", background: "#f4f7ff" }}>
        <DrawerComponent />
        <Box sx={{ flexGrow: 1 }}>
          <AppBarComponent />
          <Dashboard />
        </Box>
      </Box>
    </>
  );
};

export default DashboardPage;
