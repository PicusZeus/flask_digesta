import {Chart, Pie, Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import {useState} from "react";


const AuhtorshipBooksChart = ({authors}) => {
    const [diagramToggle, setDiagramToggle] = useState(true)
    const lessOnePercent = authors.filter(author => (author.authorship < 0.5))
    const sumLessOnePercent = lessOnePercent.reduce((acc, auth) => acc + auth.authorship, 0)
    //
    // console.log(sumLessOnePercent, 'SUM')
    const moreOnePercent = authors.filter(author => (author.authorship >= 0.5))
    // authors.sort((a, b) => {
    //     return (a.authorship - b.authorship)
    // })


    console.log(authors)

    const data = {
        labels: [...moreOnePercent.map(author=>author.name), "pozostali"],
        datasets: [{
            label: "Zawartość",
            data: [...moreOnePercent.map(author=>author.authorship), sumLessOnePercent]
        }]
    }

    const dataLessOnePercent = {


        labels: lessOnePercent.map(author =>author.name ),
        datasets: [{
            label: "Zawartość",
            data: lessOnePercent.map(author => author.authorship)
        }]
    }


    const options = {
        indexAxis: "y"
    }


    return (
        <>


            <button onClick={()=>setDiagramToggle(current=>!current)}>pokaż</button>
            <Bar data={data} options={options}/>
            {/*{lessOnePercent && <Pie data={dataBar}/>}*/}
            <Bar data={dataLessOnePercent} options={options}/>
        </>)
}

export default AuhtorshipBooksChart