import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {splitLabels} from "../../../services/helpers";
import {options} from "../chartOptions";
import ChartContainer from "../ChartContainer/ChartContainer";

const BooksShareChart = ({tituli}) => {

    const chartRef = useRef(null)


    const data = {
        labels: tituli.map(titulus => {
            const label = `${titulus.number} ${titulus.title_lat}`
            return splitLabels(label, 3)
        }),
        datasets: [
            {
                label: "Procentowy udział tytułu w księdze",
                data: tituli.map(titulus => titulus.book_share),
            }
        ]
    }


    const plugins = [ChartDataLabels]

    const navigate = useNavigate()
    // })
    const clickHandler = (e) => {
        const points = chartRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {


            const index = points[0].index
            const titulus_id = tituli[index].id
            navigate("/statystyki/digesta/tituli/" + titulus_id)

        }


    }

    const height = tituli.length

    return (
        <ChartContainer height={height}>
            <Bar ref={chartRef} onClick={clickHandler} data={data} options={options} plugins={plugins}/>
        </ChartContainer>
    )
}

export default BooksShareChart