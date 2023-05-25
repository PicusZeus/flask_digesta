import {Bar} from "react-chartjs-2";
import {splitLabels} from "../../../services/helpers";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {options} from "../chartOptions";
import ChartContainer from "../ChartContainer/ChartContainer";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

const BookAuthorshipChart = ({authors, book_id, titulus_id}) => {
    const chartRef = useRef(null)
    const navigate = useNavigate()
    authors.sort((a, b) => {
        return b.authorship - a.authorship
    })


    const data = {
        labels: authors.map(share => {
            const label = share.author.name
            return splitLabels(label, 1)
        }),
        datasets: [{
            label: "Procentowy udział prac jurysty",
            data: authors.map(share => share.authorship),

        }]

    }


    const plugins = [ChartDataLabels]


    const height = data.labels.length * 40

    const clickHandler = (e) => {
        const points = chartRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {

            const index = points[0].index
            const author_id = authors[index].author.id
            let url = `/statystyki/jurysci/${author_id}/${book_id}`
            if (titulus_id) {url = `/statystyki/jurysci/${author_id}/${book_id}/${titulus_id}`}
            navigate(url)

        }
    }
    return (

        <ChartContainer height={height}>
            <Bar onClick={clickHandler} ref={chartRef} data={data} options={options} plugins={plugins}/>
        </ChartContainer>

    )
}

export default BookAuthorshipChart