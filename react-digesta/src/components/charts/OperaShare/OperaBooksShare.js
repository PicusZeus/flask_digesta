import {Doughnut, Bar} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"


const OperaBooksShare = ({opera}) => {

    const lessOnePercent = opera.filter(author=>(author.coverage < 0.4))
    const sumLessOnePercent = lessOnePercent.reduce((acc, op) => acc + op.coverage, 0)

    const moreOnePercent = opera.filter(author=>(author.coverage >= 0.4))

    const data = {
        labels: [...moreOnePercent.map(opus=>opus.title_lat), "pozostałe"],
        datasets: [{
            label: 'Opera',
            data: [...moreOnePercent.map(opus=>opus.coverage), sumLessOnePercent]
        }]
    }

        const dataLess = {
        labels: lessOnePercent.map(opus=>opus.title_lat),
        datasets: [{
            label: 'Opera',
            data: lessOnePercent.map(opus=>opus.coverage)
        }]
    }

    return (
        <>
               <Bar data={data} options={{indexAxis: "y"}}/>

            {/*{lessOnePercent.length > 0 &&    <OperaShare data={lessOnePercent}/>}*/}

        </>)

}

export default OperaBooksShare