import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../chartOptions";
import MyBar from "../MyBar/MyBar";

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
  const height = data.labels.length;

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

export default BooksOpusCoverage;
