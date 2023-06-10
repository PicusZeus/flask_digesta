import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../chartOptions";
import MyBar from "../MyBar/MyBar";

const BooksAuthorshipShareChart = ({ books }) => {
  const chartRef = useRef(null);
  const navigate = useNavigate();
  const data = {
    labels: books.map((book) => {
      return `Księga ${book.book.book_nr}`;
    }),
    datasets: [
      {
        label: "Procentowy udział dzieł jurysty w księdze",
        data: books.map((book) => book.authorship),
      },
    ],
  };

  const clickHandler = (e) => {
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

  const height = books.length;

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

export default BooksAuthorshipShareChart;
