import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { splitLabels } from "../../../services/helpers";
import { options } from "../chartOptions";
import MyBar from "../MyBar/MyBar";

const BooksShareChart = ({ tituli }) => {
  const chartRef = useRef(null);

  const data = {
    labels: tituli.map((titulus) => {
      const label = `${titulus.number} ${titulus.title_lat}`;
      return splitLabels(label, 3);
    }),
    datasets: [
      {
        label: "Procentowy udział tytułu w księdze",
        data: tituli.map((titulus) => titulus.book_share),
      },
    ],
  };


  const navigate = useNavigate();
  // })
  const clickHandler = (e) => {
    const points = chartRef.current.getElementsAtEventForMode(
      e,
      "nearest",
      { intersect: true },
      true
    );
    if (points.length > 0) {
      const index = points[0].index;
      const titulus_id = tituli[index].id;
      navigate("/statystyki/digesta/tituli/" + titulus_id);
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

export default BooksShareChart;
