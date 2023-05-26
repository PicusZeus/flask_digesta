import {Bar} from "react-chartjs-2";
import {useRef} from "react";
import {Chart as ChartJS} from 'chart.js/auto'
import {useNavigate} from "react-router-dom";
import {options} from "../chartOptions";
import ChartContainer from "../ChartContainer/ChartContainer";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {splitLabels} from "../../../services/helpers";

const TituliAuthorshipShareChart = ({tituli}) => {
    const chartRef = useRef(null)
    const navigate = useNavigate()

    const data = {
        labels: tituli.map(titulus => {
            const label = `${titulus.titulus.number} ${titulus.titulus.title_lat}`
                return splitLabels(label, 3)
            }
        ),
        datasets: [
            {
                label: "Procentowy udział prac autora w tytułach",
                data: tituli.map(titulus => titulus.authorship)
            }
        ]
    }


    const clickHandler = (e) => {
        const points = chartRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {
            const index = points[0].index
            const titulus_id = tituli[index].titulus.id
            // console.log(book_id)
            navigate(titulus_id.toString()
        )}
    }
    const plugins = [ChartDataLabels]

    const height = tituli.length
    return <ChartContainer height={height}>


        <Bar onClick={clickHandler} ref={chartRef} data={data} options={options} plugins={plugins}/>
    </ChartContainer>
}

export default TituliAuthorshipShareChart