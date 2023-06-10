import { options } from "../chartOptions";
import MyBar from "../MyBar/MyBar";
import { splitLabels } from "../../../services/helpers";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const BookOperaShareChart = ({ opera, book_id }) => {
  const chartRef = useRef(null);
  const navigate = useNavigate();
  opera.sort((a, b) => {
    return b.coverage - a.coverage;
  });

  const data = {
    labels: opera.map((opus) => {
      let author = "";
      if (opus.opus.author) {
        author = opus.opus.author.name;
      }
      const label = `${author} ${opus.opus.title_lat}`.trim();
      return splitLabels(label, 2);
    }),
    datasets: [
      {
        label: "Procentowy udział prac jurystów",
        data: opera.map((opus) => opus.coverage),
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
      const opus_id = opera[index].opus.id;
      navigate(`/statystyki/opera/${opus_id}/${book_id}`);
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

export default BookOperaShareChart;
