import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/actions/userActions";
import { Grid, Paper } from "@mui/material";

const Chart = () => {
  const dispatch = useDispatch();
  const [genderData, setGenderData] = useState({});
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      const genderCounts = users.reduce((acc, user) => {
        acc[user.gender] = (acc[user.gender] || 0) + 1;
        return acc;
      }, {});

      setGenderData(genderCounts);
    }
  }, [users]);

  const genderOptions = {
    chart: {
      type: "pie",
      height: "80%",
    },
    title: {
      text: "Gender Distribution",
    },
    series: [
      {
        name: "Gender",
        colorByPoint: true,
        data: Object.entries(genderData).map(([gender, count]) => ({
          name: gender,
          y: count,
        })),
      },
    ],
  };

  const ageOptions = {
    chart: {
      type: "bar",
      height: "80%",
    },
    title: {
      text: "Age Distribution",
    },
    xAxis: {
      title: {
        text: "Age",
      },
      categories: Array.from(
        { length: 11 },
        (_, i) => `${i * 10}-${i * 10 + 9}`
      ),
    },
    yAxis: {
      title: {
        text: "Numbers",
      },
    },
    series: [
      {
        name: "Numbers",
        data: users
          ? Array.from({ length: 11 }, () => 0).map(
              (_, i) =>
                users.filter(
                  (user) =>
                    parseInt(user.age) >= i * 10 &&
                    parseInt(user.age) < i * 10 + 10
                ).length
            )
          : [],
      },
    ],
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "space-around", marginTop: "20px" }}
    >
      <Grid item xs={5}>
        <Paper style={{ padding: "20px", height: "400px" }}>
          <HighchartsReact highcharts={Highcharts} options={genderOptions} />
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper style={{ padding: "20px", height: "400px" }}>
          <HighchartsReact highcharts={Highcharts} options={ageOptions} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chart;
