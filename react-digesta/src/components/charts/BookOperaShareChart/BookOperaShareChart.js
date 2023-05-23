import {Doughnut, Bar} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"
import ChartDataLabels from "chartjs-plugin-datalabels";
import {options} from "../chartOptions";
import ChartContainer from "../ChartContainer/ChartContainer";
import {splitLabels} from "../../../services/helpers";

const BookOperaShareChart = ({opera}) => {

    opera.sort((a, b) => {
        return b.coverage - a.coverage
    })

    const data = {
        labels: opera.map(opus => {
            let author = ''
            if (opus.opus.author) {author = opus.opus.author.name}
            const label = `${author} libri ${opus.opus.title_lat}`.trim()
            return splitLabels(label, 2)
        }),
        datasets: [{
            label: 'Procentowy udział prac jurystów',
            data: opera.map(opus => opus.coverage),
        }]
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

export default BookOperaShareChart