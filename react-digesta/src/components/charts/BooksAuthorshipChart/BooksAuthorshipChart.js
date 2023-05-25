import { Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {options} from "../chartOptions";
import ChartContainer from "../ChartContainer/ChartContainer";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {splitLabels} from "../../../services/helpers";

const BooksAuthorshipChart = ({authors}) => {
    authors.sort((a, b) => {
        return (b.authorship - a.authorship)
    })


    const chartRef = useRef(null)
    const navigate = useNavigate()


    const clickHandler = (e) => {
        const points = chartRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {
            const index = points[0].index
            const author_id = authors[index].id
            navigate(author_id.toString())


        }
    }



    const data = {
        labels: authors.map(author => {
            return splitLabels(author.name, 1)
            }
        ),
        datasets: [{
            label: "Udział procentowy prac jurystów",
            data: authors.map(author => author.authorship),

        }]
    }


    const plugins = [ChartDataLabels]


    const height = data.labels.length * 40
    return (
        <>
            <ChartContainer height={height}>
                <Bar ref={chartRef} onClick={clickHandler} data={data} options={options} plugins={plugins}/>

            </ChartContainer>

        </>)
}

export default BooksAuthorshipChart