import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import {splitLabels} from "../../../services/helpers";
import classes from "./BookAuthorshipChart.module.css"
import ChartDataLabels from "chartjs-plugin-datalabels";
import {options} from "../chartOptions";
import ChartContainer from "../ChartContainer/ChartContainer";

const BookAuthorshipChart = ({authors}) => {

    authors.sort((a, b) => {
        return b.authorship - a.authorship
    })
    const lessOnePercent = authors.filter(author => (author.authorship < 1))
    const sumLessOnePercent = lessOnePercent.reduce((acc, auth) => acc + auth.authorship, 0)

    const moreOnePercent = authors.filter(author => (author.authorship >= 1))
    authors.sort((a, b) => {
        return (a.authorship - b.authorship)
    })


    const data = {
        labels: [...moreOnePercent.map(share => {
            const label = share.author.name
            return splitLabels(label, 1)
        })],
        datasets: [{
            label: "Procentowy udział prac jurysty",
            data: [...moreOnePercent.map(share => share.authorship)],

        }]

    }
    if (sumLessOnePercent > 0) {
        data.labels.push("Pozostali")
        data.datasets[0].data.push(sumLessOnePercent)
    }

    const plugins = [ChartDataLabels]


    const height = data.labels.length * 40

    return (
        <>
            <ChartContainer height={height}>
                <Bar data={data} options={options} plugins={plugins}/>
            </ChartContainer>


        </>)
}

export default BookAuthorshipChart