import { splitLabels } from "../../../services/helpers";
import { options } from "../chartOptions";
import MyBar from "../MyBar/MyBar";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const BookAuthorshipChart = ({ authors, book_id, titulus_id }) => {
  const chartRef = useRef(null);
  const navigate = useNavigate();
  authors.sort((a, b) => {
    return b.authorship - a.authorship;
  });

  const data = {
    labels: authors.map((share) => {
      const label = share.author.name;
      return splitLabels(label, 1);
    }),
    datasets: [
      {
        label: "Procentowy udział prac jurysty",
        data: authors.map((share) => share.authorship),
      },
    ],
  };

  const height = data.labels.length;

  const clickHandler = (e) => {
    const points = chartRef.current.getElementsAtEventForMode(
      e,
      "nearest",
      { intersect: true },
      true
    );
    if (points.length > 0) {
      const index = points[0].index;
      const author_id = authors[index].author.id;
      let url = `/statystyki/jurysci/${author_id}/${book_id}`;
      if (titulus_id) {
        url = `/statystyki/jurysci/${author_id}/${book_id}/${titulus_id}`;
      }
      navigate(url);
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

export default BookAuthorshipChart;
