
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import {useRef} from "react";
import {useNavigate} from "react-router-dom";



const BooksAuthorshipShare = ({books}) => {

    const chartRef = useRef(null)
    const navigate = useNavigate()
    const data = {
        labels: books.map(book=>book.book.book_latin_name),
        datasets: [
            {
                label: "coś tam",
                data: books.map(book=>book.authorship)
            }
        ]
    }

    const options = {
        indexAxis: "y"
    }

    const clickHandler = (e) => {
        const points = chartRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {
            const index = points[0].index
            const book_id = books[index].book.id
            console.log(book_id)
            navigate(book_id.toString())
        }
    }

    return (

        <Bar onClick={clickHandler} ref={chartRef} data={data} options={options}/>
    )


}

export default BooksAuthorshipShare