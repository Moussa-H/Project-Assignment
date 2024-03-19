

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";


export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (token, username) => ({
  type: LOGIN_SUCCESS,
  payload: { token, username },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: { error },
});

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
    
      if (username === "Mhaidar" && password === "123") {
        const token = "516|wjkQhp7Jzsnrh6o8qlkf1rEOj7nRJP7vomznGagfbd155264";
        dispatch(loginSuccess(token, username));
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    dispatch({ type: "LOGOUT" });
  };
};