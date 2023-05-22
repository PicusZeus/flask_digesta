import {Bar} from "react-chartjs-2";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";


const BooksOpusCoverage = ({books}) => {
    const navigate = useNavigate()
    console.log(books)
    const chartRef = useRef(null)
    const data = {
        labels: books.map(book=> book.book.book_latin_name),
        datasets: [
            {
                label: 'coś tam',
                data: books.map(book=>book.coverage)
            }
        ]
    }

    const options = {
        indexAxis: "y"
    }

    const onClickHandler = (e) => {
        const points = chartRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {
            const index = points[0].index
            const book_id = books[index].book.id
            navigate(book_id.toString())
        }
    }

    return <>
        <Bar onClick={onClickHandler} ref={chartRef} data={data} options={options}/>
    </>
}

export default BooksOpusCoverage