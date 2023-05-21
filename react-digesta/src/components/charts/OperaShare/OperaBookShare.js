import {Doughnut, Bar} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"


const OperaBooksShare = ({opera}) => {
    console.log(opera)
    const lessOnePercent = opera.filter(opus=>(opus.coverage < 0.4))
    const sumLessOnePercent = lessOnePercent.reduce((acc, op) => acc + op.coverage, 0)
    console.log(lessOnePercent, sumLessOnePercent, "TUTAJ")
    const moreOnePercent = opera.filter(opus=>(opus.coverage >= 0.4))

    const data = {
        labels: [...moreOnePercent.map(opus=>opus.opus.title_lat), "pozostałe"],
        datasets: [{
            label: 'Opera',
            data: [...moreOnePercent.map(opus=>opus.coverage), sumLessOnePercent]
        }]
    }

        const dataLess = {
        labels: lessOnePercent.map(opus=>opus.opus.title_lat),
        datasets: [{
            label: 'Opera',
            data: lessOnePercent.map(opus=>opus.coverage)
        }]
    }

    return (
        <>
               <Bar data={data} options={{indexAxis: "y"}}/>
                <Bar data={dataLess} options={{indexAxis: "y"}}/>

            {/*{lessOnePercent.length > 0 &&    <OperaShare data={lessOnePercent}/>}*/}

        </>)

}

export default OperaBooksShare