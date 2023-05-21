import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

const BooksShareChart = ({tituli}) => {

    const chartRef = useRef(null)





    const data = {
            labels: tituli.map(titulus => titulus.title_lat),
            datasets: [
                {
                    label: "Tytuł",
                    data: tituli.map(titulus=>titulus.book_share)
                }
            ]
        }

    const options = {
        indexAxis: 'y',
    };


    const navigate = useNavigate()
    // })
    const clickHandler = (e) => {
        const points = chartRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {


        const index = points[0].index
            console.log(index)
        if (index) {
            const n = () => navigate("/statystyki/digesta/tituli/" + index)
            n()

        }}


    }

    return (

        <Bar ref={chartRef} onClick={clickHandler} data={data} options={options}/>
    )
}

export default BooksShareChart