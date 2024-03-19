import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../common/Loader";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = localStorage.getItem("token");
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default PrivateRoute;
