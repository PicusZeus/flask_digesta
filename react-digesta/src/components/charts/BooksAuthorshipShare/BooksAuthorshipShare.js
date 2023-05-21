
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import {useRef} from "react";



const BooksAuthorshipShare = ({books}) => {

    const charRef = useRef()

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

    return (

        <Bar data={data} options={options}/>
    )


}

export default BooksAuthorshipShare