import { Chart } from "chart.js";
import classes from "./ChartContainer.module.css";

const ChartContainer = ({ height, children }) => {
  return (
    <div
      style={{ height: height * 45 + 100 }}
      className={classes.chart_container}
    >
      {children}
    </div>
  );
};

export default ChartContainer;
