import {Chart, Pie, Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";


const AuthorshipBooksChart = ({authors}) => {
    const [diagramToggle, setDiagramToggle] = useState(true)
    const lessOnePercent = authors.filter(author => (author.authorship < 0.5))
    const sumLessOnePercent = lessOnePercent.reduce((acc, auth) => acc + auth.authorship, 0)
    //
    // console.log(sumLessOnePercent, 'SUM')
    const moreOnePercent = authors.filter(author => (author.authorship >= 0.5))
    // authors.sort((a, b) => {
    //     return (a.authorship - b.authorship)
    // })
    const chartMainRef = useRef(null)
    const chartSecondaryRef = useRef(null)
    const navigate = useNavigate()


    const clickHandlerMain = (e) => {
        const points = chartMainRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        console.log(points)
        if (points.length > 0) {
            const index = points[0].index
            if (index < moreOnePercent.length) {
                const author_id = moreOnePercent[index].id
                console.log(author_id)
                navigate(author_id.toString())
            }

        }
    }


    console.log(authors)

    const data = {
        labels: [...moreOnePercent.map(author => author.name), "pozostali"],
        datasets: [{
            label: "Zawartość",
            data: [...moreOnePercent.map(author => author.authorship), sumLessOnePercent],

        }]
    }

    const dataLessOnePercent = {


        labels: lessOnePercent.map(author => author.name),
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


            <button onClick={() => setDiagramToggle(current => !current)}>pokaż</button>
            <Bar ref={chartMainRef} onClick={clickHandlerMain} data={data} options={options}/>
            {/*{lessOnePercent && <Pie data={dataBar}/>}*/}
            <Bar ref={chartSecondaryRef} data={dataLessOnePercent} options={options}/>
        </>)
}

export default AuthorshipBooksChart