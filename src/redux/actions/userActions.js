// userActions.js
import axios from "axios";

export const getData = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      dispatch({ type: "GET_DATA_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "GET_DATA_FAILURE",
        error: error.response.data.message,
      });
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const reversedUsers = response.data.reverse();
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: reversedUsers });
      
    } catch (error) {
      dispatch({
        type: "FETCH_USERS_FAILURE",
        error: error.response.data.message,
      });
    }
  };
};

export const updateUserData = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${userData.id}`,
        userData
      );
      dispatch({ type: "UPDATE_USER_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_FAILURE",
        error: error.response.data.message,
      });
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      dispatch({ type: "DELETE_USER_SUCCESS", payload: userId });
    } catch (error) {
      dispatch({
        type: "DELETE_USER_FAILURE",
        error: error.response.data.message,
      });
    }
  };
};

export const addUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        userData
      );
      dispatch({ type: "ADD_USER_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "ADD_USER_FAILURE",
        error: error.response.data.message,
      });
    }
  };
};
