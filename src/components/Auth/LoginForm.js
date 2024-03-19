import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import Loader from "../common/Loader";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  maxWidth: "600px", 
  margin: "auto", 
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      await dispatch(login(values.username, values.password));
      setRedirectToDashboard(true); 
    },
  });

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" replace />; 
  }

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 5 }}>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <StyledTextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Grid>
          {isLoading && (
            <Grid item xs={12}>
              <Loader /> 
            </Grid>
          )}
          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </StyledPaper>
  );
};

export default LoginForm;
