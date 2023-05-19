import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

const BookAuthorshipChart = ({bookAuthorship, author}) => {

    // const books = bookAuthorship.filter(book=>book.authorship !== 0)
    const books = bookAuthorship
    const data = {
        labels: books.map(book=>book.book.book_nr),
        datasets: [{
            label: "Księga",
            data: books.map(book=>book.authorship)
        }]
    }
      const options = {
        // responsive: true,
        // plugins: {
        //     legend: {
        //         display: true,
        //         position: "bottom"
        //     },
        // },

        indexAxis: 'y',
        // maintainAspectRatio: false


    };

    return (
        <Bar data={data} options={options}/>
    )
}

export default BookAuthorshipChart