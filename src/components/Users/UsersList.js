import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Paper,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Edit, Delete, Add, Close, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import Loader from "../common/Loader";
import { deleteUser, fetchUsers } from "../../redux/actions/userActions";

const UsersList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, open]);

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    setOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await dispatch(deleteUser(userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAdd = () => {
    setSelectedUserId(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers =
    users &&
    users.length > 0 &&
    users.filter(
      (user) =>
        user &&
        user.firstName &&
        user.firstName.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <>
      {loading ? ( 
        <Loader />
      ) : (
        <Box sx={{ padding: 3, paddingLeft: 3 }}>
          <div>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <TextField
                label="Search"
                variant="outlined"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{
                  height: "40px",
                  fontSize: "14px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleAdd}
                sx={{ height: "40px", fontSize: "12px", marginTop: "20px" }}
              >
                Add User
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers &&
                    filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            {user.firstName} {user.lastName}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.gender}</TableCell>
                          <TableCell>{user.age}</TableCell>
                          <TableCell>{user.address}</TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="edit"
                              onClick={() => handleEdit(user.id)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(user.id)}
                            >
                              <Delete />
                            </IconButton>

                            <IconButton
                              aria-label="view"
                              component={Link}
                              to={`/user/${user.id}`}
                            >
                              <Visibility />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredUsers ? filteredUsers.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                {selectedUserId ? "Edit User" : "Add User"}
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                >
                  <Close />
                </IconButton>
              </DialogTitle>

              <DialogContent>
                <UserForm userId={selectedUserId} handleClose={handleClose} />
              </DialogContent>
            </Dialog>
          </div>
        </Box>
      )}
    </>
  );
};

export default UsersList;
