import {Chart, Pie, Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import {useState} from "react";


const PieAuhtorshipBooksChart = ({authors}) => {
    const [diagramToggle, setDiagramToggle] = useState(true)
    const lessOnePercent = authors.filter(author => (author.authorship < 1))
    const sumLessOnePercent = lessOnePercent.reduce((acc, auth) => acc + auth.authorship, 0)

    console.log(sumLessOnePercent, 'SUM')
    const moreOnePercent = authors.filter(author => (author.authorship >= 1))
    authors.sort((a, b) => {
        return (a.authorship - b.authorship)
    })



    const data = {
        labels: [...moreOnePercent.map(share => share.author.name), "pozostali"],
        datasets: [{
            label: "Zawartość",
            data: [...moreOnePercent.map(share => share.authorship), sumLessOnePercent]
        }]
    }
       const dataBar = {
        labels: lessOnePercent.map(share => share.author.name),
        datasets: [{
            label: "Zawartość",
            data: lessOnePercent.map(share => share.authorship)
        }]
    }

    const optionsBar = {
        indexAxis: "y"
    }


    return (
        <>


            <button onClick={()=>setDiagramToggle(current=>!current)}>pokaż</button>
            <Pie data={data}/>
            {lessOnePercent && <Pie data={dataBar}/>}
        </>)
}

export default PieAuhtorshipBooksChart