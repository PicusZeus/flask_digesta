import { useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../chartOptions";
import MyBar from "../MyBar/MyBar";
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

  const height = books.length;

  const navigate = useNavigate();
  const clickHandler = (e) => {
    const points = chartRef.current.getElementsAtEventForMode(
      e,
      "nearest",
      { intersect: true },
      true
    );
    console.log(points);
    if (points.length > 0) {
      const index = points[0].index;
      const book_id = books[index].id;
      navigate("libri/" + book_id);
    }
  };

  return (
    <MyBar
      height={height}
      ref={chartRef}
      onClick={clickHandler}
      data={data}
      options={options}
    />
  );
};

export default BooksShareChart;
