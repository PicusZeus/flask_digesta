import { Chart as Chartjs } from "chart.js";
import { Bar } from "react-chartjs-2";
import classes from "./MyBar.module.css";
import React from "react";
import { options } from "../chartOptions";
import ChartDataLabels from "chartjs-plugin-datalabels";
const MyBar = React.forwardRef(function ({ height, onClick, data }, ref) {
  const plugins = [ChartDataLabels];

  return (
    <div
      style={{ height: height * 45 + 100 }}
      className={classes.chart_container}
    >
      <Bar
        ref={ref}
        onClick={onClick}
        data={data}
        options={options}
        plugins={plugins}
      />
    </div>
  );
});

export default MyBar;
