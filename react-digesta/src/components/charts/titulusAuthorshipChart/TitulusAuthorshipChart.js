import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

const TitulusAuthorshipChart = ({tituliAuthorship, author}) => {

    // const books = bookAuthorship.filter(book=>book.authorship !== 0)
    const tituli = tituliAuthorship
    const data = {
        labels: tituli.map(titulus => titulus.titulus.title_lat),
        datasets: [{
            label: "Księga",
            data: tituli.map(titulus => titulus.authorship)
        }]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom"
            },
        },

        indexAxis: 'y',
        // maintainAspectRatio: false


    };

    return (
        <Bar data={data} options={options}/>
    )
}

export default TitulusAuthorshipChart