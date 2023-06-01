import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../chartOptions";
import ChartContainer from "../ChartContainer/ChartContainer";
import { splitLabels } from "../../../services/helpers";

const OperaCoverageChart = ({ opera }) => {
  opera.sort((a, b) => {
    return b.coverage - a.coverage;
  });
  const chartRef = useRef(null);
  const navigate = useNavigate();

  const dataAbove = {
    labels: opera.map((opus) => {
      let author = "";
      if (opus.author) {
        author = opus.author.name;
      }
      let label = `${author} ${opus.title_lat}`.trim();
      if (opus.opus) {
        label = `${author} ${opus.opus.title_lat}`.trim();
      }

      return splitLabels(label, 2);
    }),
    datasets: [
      {
        label: "Procentowy udział pracy",
        data: opera.map((opus) => opus.coverage),
      },
    ],
  };

  const plugins = [ChartDataLabels];

  const onClickHandler = (e) => {
    const points = chartRef.current.getElementsAtEventForMode(
      e,
      "nearest",
      { intersect: true },
      true
    );
    if (points.length > 0) {
      const index = points[0].index;
      let opus_id = opera[index].id;
      if (!opus_id) {
        opus_id = opera[index].opus.id;
      }
      navigate(`/statystyki/opera/${opus_id.toString()}`);
    }
  };

  const height = opera.length;

  return (
    <>
      <ChartContainer height={height}>
        <Bar
          onClick={onClickHandler}
          ref={chartRef}
          data={dataAbove}
          options={options}
          plugins={plugins}
        />
      </ChartContainer>
    </>
  );
};

export default OperaCoverageChart;
