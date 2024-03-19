import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import Loader from "../common/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); 
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Chart />
    </>
  );
};

export default Dashboard;
