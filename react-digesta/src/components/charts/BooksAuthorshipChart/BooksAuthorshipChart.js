import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../chartOptions";
import MyBar from "../MyBar/MyBar";
import { splitLabels } from "../../../services/helpers";

const BooksAuthorshipChart = ({ authors }) => {
  authors.sort((a, b) => {
    return b.authorship - a.authorship;
  });

  const chartRef = useRef(null);
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
      const author_id = authors[index].id;
      navigate(author_id.toString());
    }
  };

  const data = {
    labels: authors.map((author) => {
      return splitLabels(author.name, 1);
    }),
    datasets: [
      {
        label: "Udział procentowy prac jurystów",
        data: authors.map((author) => author.authorship),
      },
    ],
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

export default BooksAuthorshipChart;
