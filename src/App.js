import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Provider} from "react-redux";
import store from "./redux/store";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import UserPage from "./components/Users/UserPage";
import PrivateRoute from "./components/Auth/PrivateRoute";

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={DashboardPage} />}
          />
          <Route path="/users" element={<PrivateRoute element={UsersPage} />} />
          <Route
            path="/user/:id"
            element={<PrivateRoute element={UserPage} />}
          />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
