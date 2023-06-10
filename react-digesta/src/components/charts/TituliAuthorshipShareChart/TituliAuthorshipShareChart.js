import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../chartOptions";
import MyBar from "../MyBar/MyBar";
import { splitLabels } from "../../../services/helpers";

const TituliAuthorshipShareChart = ({ tituli }) => {
  const chartRef = useRef(null);
  const navigate = useNavigate();

  const data = {
    labels: tituli.map((titulus) => {
      const label = `${titulus.titulus.number} ${titulus.titulus.title_lat}`;
      return splitLabels(label, 3);
    }),
    datasets: [
      {
        label: "Procentowy udział prac autora w tytułach",
        data: tituli.map((titulus) => titulus.authorship),
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
      const titulus_id = tituli[index].titulus.id;
      navigate(titulus_id.toString());
    }
  };

  const height = tituli.length;
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

export default TituliAuthorshipShareChart;
