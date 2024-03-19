import React, { useEffect } from "react";
import { Typography, Paper, Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/actions/userActions";
import AppBarComponent from "../Navigation/AppBarComponent";
import DrawerComponent from "../Navigation/DrawerComponent";
import Loader from "../common/Loader";

const UserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.user.users.find((user) => user.id === id)
  );
  const loading = useSelector((state) => state.user.loading); 

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Typography variant="h6">User not found!</Typography>;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", background: "#f4f7ff" }}>
      <DrawerComponent />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarComponent />

        <Box p={2}>
          <Paper
            elevation={3}
            sx={{
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "60px",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ marginBottom: 2, padding: "0px" }}
            >
              User Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Email:</strong> {user.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Phone:</strong> {user.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Gender:</strong> {user.gender}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Age:</strong> {user.age}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>Address:</strong> {user.address}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;
