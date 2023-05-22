import {Bar} from "react-chartjs-2";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";


const TituliAuthorshipShare = ({tituli}) => {
    const chartRef = useRef(null)
    const navigate = useNavigate()

    const data = {
        labels: tituli.map(titulus => titulus.titulus.title_lat),
        datasets: [
            {
                label: "Tytuły",
                data: tituli.map(titulus => titulus.authorship)
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
            const titulus_id = tituli[index].titulus.id
            // console.log(book_id)
            navigate(titulus_id.toString())
        }
    }

    console.log(tituli)
    return <Bar onClick={clickHandler} ref={chartRef} data={data} options={options}/>
}

export default TituliAuthorshipShare