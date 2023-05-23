import {Bar} from "react-chartjs-2";
// import {Chart as ChartJS} from 'chart.js/auto'
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import classes from "./BooksShareChart.module.css";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {options} from "../chartOptions";
const BooksShareChart = ({books, tituli, author}) => {

    const chartRef = useRef(null)

    const randomColorGenerator = function () {
        return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
    };
    const data = {
        labels: books.map(book => book.book_latin_name),
        datasets: [{
            label: "Procentowy udział księgi w objętości Digestów",
            // backgroundColor: books.map(b=>{return randomColorGenerator()}),
            // fillColor: randomColorGenerator(),
            // strokeColor: randomColorGenerator(),
            // highlightFill: randomColorGenerator(),
            // highlightStroke: randomColorGenerator(),
            data: books.map(book => book.share),
            datalabels: {
                color: 'black',
                anchor: 'start',
                align: "end",
                font_weight: "bold",
                formatter: (value, context) => {
                    return `${value} %`
                }

            }
        }],

    }


    const plugins = [ChartDataLabels]
    const height = books.length * 50


    const navigate = useNavigate()
    const clickHandler = (e) => {
        const points = chartRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {

            const index = points[0].index
            const book_id = books[index].id
            navigate("libri/" + book_id)
        }


    }

    return (
        <div style={{height: height}} className={classes.chart_container}>
            <Bar ref={chartRef} onClick={clickHandler} data={data} options={options} plugins={plugins}/>
        </div>

    )
}

export default BooksShareChart