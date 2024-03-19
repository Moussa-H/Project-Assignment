import React from "react";
import { CircularProgress, Grid, Box } from "@mui/material";

const Loader = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Box>
        <CircularProgress color="primary" />
      </Box>
    </Grid>
  );
};

export default Loader;
