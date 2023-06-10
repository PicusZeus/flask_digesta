import { options } from "../chartOptions";
import MyBar from "../MyBar/MyBar";
import { splitLabels } from "../../../services/helpers";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { digestaActions } from "../../../store/digesta-slice";
import { uiActions } from "../../../store/ui-slice";

const TituliCoverage = ({ tituli, jurysta_id, book_id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const data = {
    labels: tituli.map((titulus) => {
      const label = `${titulus.titulus.number} ${titulus.titulus.title_lat}`;
      return splitLabels(label, 4);
    }),
    datasets: [
      {
        label: "Udział pracy w zawartości tytułów",
        data: tituli.map((titulus) => titulus.coverage),
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
      dispatch(digestaActions.setChosenBookId(book_id));
      dispatch(digestaActions.setChosenTitulusId(titulus_id));
      dispatch(digestaActions.setChosenJuristId(jurysta_id));
      dispatch(uiActions.setActiveSection("juristsNav"));
      const url = `/jurysci/${jurysta_id}/digesta/${jurysta_id}`;
      navigate(url);
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

export default TituliCoverage;
