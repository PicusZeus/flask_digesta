import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import classes from "./OperaCoverage.module.css"
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

const OperaCoverage = ({opera}) => {

    const chartMoreRef = useRef(null)
    const chartLessRef = useRef(null)
    const navigate = useNavigate()
    const operaAboveHalfPercent = opera.filter(opus => opus.coverage > 0.5)


    const operaLessHalfPercent = opera.filter(opus => opus.coverage <= 0.5)

    const dataAbove = {
        labels: operaAboveHalfPercent.map(opus => {
            return [opus.title_lat, "jur"]
        }),
        datasets: [
            {
                label: "opera",
                data: operaAboveHalfPercent.map(opus => opus.coverage)
            }
        ]
    }

    const dataLess = {
        labels: operaLessHalfPercent.map(opus => {
            return [opus.title_lat, "jur"]
        }),
        datasets: [
            {
                label: "opera",
                data: operaLessHalfPercent.map(opus => opus.coverage)
            }
        ]
    }
    const options = {
        indexAxis: "y",
        barThickness: 10,
        maintainAspectRatio: false,
        clip: 10,

        // scales: {
        //     x: {},
        //     y: {
        //         offset: true,
        //         gridLines: {
        //             display: false
        //         }
        //     }
        // }
    }
    const plugins = [ChartDataLabels]

    const onClickMoreHandler = (e) => {
        const points = chartMoreRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {
            const index = points[0].index
            const opus_id = operaAboveHalfPercent[index].id
            navigate(opus_id.toString())
        }
    }

    const onClickLessHandler = (e) => {
        const points = chartLessRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {
            const index = points[0].index
            const opus_id = operaAboveHalfPercent[index].id
            navigate(opus_id.toString())
        }
    }


    console.log(opera)
    return (
        <>

            <div className={classes.chart}>
                <Bar onClick={onClickMoreHandler} ref={chartMoreRef} data={dataAbove} options={options}/>


            </div>

            <div className={classes.chart}>
                <Bar onClick={onClickLessHandler} ref={chartLessRef} data={dataLess} options={options}/>


            </div>
        </>
    )


}

export default OperaCoverage