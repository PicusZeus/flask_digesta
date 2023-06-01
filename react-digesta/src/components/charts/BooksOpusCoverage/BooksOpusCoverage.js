import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../chartOptions";
import ChartContainer from "../ChartContainer/ChartContainer";
import ChartDataLabels from "chartjs-plugin-datalabels";

const BooksOpusCoverage = ({ books }) => {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const data = {
    labels: books.map((book) => {
      return `Księga ${book.book.book_nr}`;
    }),
    datasets: [
      {
        label: "Udział pracy w poszczególnych księgach Digestów",
        data: books.map((book) => book.coverage),
      },
    ],
  };

  const onClickHandler = (e) => {
    const points = chartRef.current.getElementsAtEventForMode(
      e,
      "nearest",
      { intersect: true },
      true
    );
    if (points.length > 0) {
      const index = points[0].index;
      const book_id = books[index].book.id;
      navigate(book_id.toString());
    }
  };
  const plugins = [ChartDataLabels];
  const height = data.labels.length;

  return (
    <ChartContainer height={height}>
      <Bar
        onClick={onClickHandler}
        ref={chartRef}
        data={data}
        options={options}
        plugins={plugins}
      />
    </ChartContainer>
  );
};

export default BooksOpusCoverage;
