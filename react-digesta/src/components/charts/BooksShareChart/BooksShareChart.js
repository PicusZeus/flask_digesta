import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

const BooksShareChart = ({books, tituli, author}) => {

    const chartRef = useRef(null)
    // const books = bookAuthorship.filter(book=>book.authorship !== 0)
    // const books = books

    let data = {
        labels: [],
        datasets: {
            label: 'brak',
            data: []
        }
    }

    if (books)  { data = {
        labels: books.map(book => book.book_nr),
        datasets: [{
            label: "Księga",
            data: books.map(book => book.share)
        }]
    }} else {
         data = {
            labels: tituli.map(titulus => titulus.title_lat),
            datasets: [
                {
                    label: "Tytuł",
                    data: tituli.map(titulus=>titulus.book_share)
                }
            ]
        }
    }
    const options = {


        indexAxis: 'y',



    };



    // new ChartJS(ctx, {
    const navigate = useNavigate()
    // })
    const clickHandler = (e) => {
        const points = chartRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {


        console.log(points)
        const index = points[0].index
            console.log(index)
        if (index) {
            const n = () => navigate("libri/" + index)
            n()

        }}


    }

    return (
        // <>
        //     {/*<MyChart/>*/}
        //     <canvas id="books"/>
        // </>
        <Bar ref={chartRef} onClick={clickHandler} data={data} options={options}/>
    )
}

export default BooksShareChart