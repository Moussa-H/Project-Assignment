
const initialState = {
  users: [],
  userData: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "GET_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };
    case "GET_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };
    case "UPDATE_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "ADD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };
    case "ADD_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
