import { Bar } from "react-chartjs-2";
import { useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { options } from "../chartOptions";
import ChartContainer from "../ChartContainer/ChartContainer";
const BooksShareChart = ({ books }) => {
  const chartRef = useRef(null);

  const data = {
    labels: books.map((book) => {
      return `Księga ${book.book_nr}`;
    }),
    datasets: [
      {
        label: "Procentowy udział księgi w objętości Digestów",

        data: books.map((book) => book.share),
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
    ],
  };

  const plugins = [ChartDataLabels];
  const height = books.length;

  const navigate = useNavigate();
  const clickHandler = (e) => {
    const points = chartRef.current.getElementsAtEventForMode(
      e,
      "nearest",
      { intersect: true },
      true
    );
    if (points.length > 0) {
      const index = points[0].index;
      const book_id = books[index].id;
      navigate("libri/" + book_id);
    }
  };

  return (
    <ChartContainer height={height}>
      <Bar
        ref={chartRef}
        onClick={clickHandler}
        data={data}
        options={options}
        plugins={plugins}
      />
    </ChartContainer>
  );
};

export default BooksShareChart;
