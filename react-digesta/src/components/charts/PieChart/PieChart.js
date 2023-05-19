import {Pie} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'


const PieChart = ({authorship, jurist}) => {
    const data = {
        labels: ["Pozostali Juryści", jurist],
        datasets: [{
            label: "Zawartość",
            data: [100-authorship, authorship]
        }]
    }
    return <Pie data={data}/>
}

export default PieChart