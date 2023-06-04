import {Chart as ChartJs} from "chart.js";

import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
const AuthorPieChart = ({ authorship, author }) => {
  const data = {
    labels: [author, "pozostali juryści"],
    datasets: [
      {
        label: "Procentowy udział prac jurysty w Digestach",
        data: [authorship, 100 - authorship],
      },
    ],
  };
  const plugins = [ChartDataLabels];
  const options = {
    layout: {
      padding: 20,
    },

    maintainAspectRatio: false,
    hoverBackgroundColor: "rgba(0,0,0,0.3)",
    plugins: {
      datalabels: {
        color: "black",
        anchor: "start",
        align: "end",
        font_weight: "bold",
        formatter: (value, context) => {
          return `${value} %`;
        },
      },
    },
  };

  return <Pie data={data} options={options} plugins={plugins} />;
};

export default AuthorPieChart;
