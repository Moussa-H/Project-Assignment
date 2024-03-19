import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserData,
  getData,
  addUser,
} from "../../redux/actions/userActions";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  Snackbar,
} from "@mui/material";

const UserForm = ({ userId, handleClose }) => {
  const dispatch = useDispatch();
  const [editedData, setEditedData] = useState({});
  const [dataChanged, setDataChanged] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formValid, setFormValid] = useState(false); 

  useEffect(() => {
    if (userId) {
      dispatch(getData(userId));
    } else {
      setEditedData({});
    }
  }, [dispatch, userId]);

  const userData = useSelector((state) =>
    userId ? state.user.userData : null
  );

  const handleAdd = () => {
    dispatch(addUser(editedData));
    setDataChanged(true);
    setOpenSnackbar(true);
    setTimeout(() => {
      setOpenSnackbar(false);
      setTimeout(handleClose, 1000);
    }, 1000);
  };

  const handleUpdate = () => {
    dispatch(updateUserData({ ...editedData, id: userData.id }));
    setDataChanged(true);
     setOpenSnackbar(true);
    setTimeout(() => {
      setOpenSnackbar(false);
      setTimeout(handleClose, 1000);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateForm();
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "age",
      "gender",
      "address",
    ];

    if (editedData && userId) {
      setFormValid(true);
    } else {
      const isValid = requiredFields.every((field) => editedData[field]);
      setFormValid(isValid);
    }
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ paddingTop: "5px" }}>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={editedData.firstName || (userData?.firstName ?? "")}
            fullWidth
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            xs={{ paddingTop: "25px" }}
            label="Last Name"
            name="lastName"
            value={editedData.lastName || (userData?.lastName ?? "")}
            fullWidth
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>
      <TextField
        label="Email"
        name="email"
        type="email"
        value={editedData.email || (userData?.email ?? "")}
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <TextField
        label="Phone"
        name="phone"
        type="number"
        value={editedData.phone || (userData?.phone ?? "")}
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Age"
            name="age"
            type="number"
            value={editedData.age || (userData?.age ?? "")}
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            style={{ height: "100px" }}
            aria-label="gender"
            name="gender"
            value={editedData.gender || (userData?.gender ?? "")}
            row
            onChange={handleChange}
            required
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </Grid>
      </Grid>
      <TextField
        label="Address"
        name="address"
        value={editedData.address || (userData?.address ?? "")}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        onChange={handleChange}
        required
      />
      <Grid container spacing={2}>
        <Grid item>
          {userId ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              disabled={!formValid}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={!formValid}
            >
              Add
            </Button>
          )}
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(true)}
        message={dataChanged ? "Data saved!" : "No data change"}
      />
    </div>
  );
};

export default UserForm;
