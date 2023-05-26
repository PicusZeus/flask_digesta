import {Bar} from "react-chartjs-2";
import {options} from "../chartOptions";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ChartContainer from "../ChartContainer/ChartContainer";
import {splitLabels} from "../../../services/helpers";
import {Chart as ChartJS} from 'chart.js/auto'
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {digestaActions} from "../../../store/digesta-slice";
import {uiActions} from "../../../store/ui-slice";

const TituliCoverage = ({tituli, jurysta_id, book_id}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const chartRef = useRef(null)
    const data = {
        labels: tituli.map(titulus => {
            const label = `${titulus.titulus.number} ${titulus.titulus.title_lat}`
            return splitLabels(label, 4)
        }),
        datasets: [
            {
                label: 'Udział pracy w zawartości tytułów',
                data: tituli.map(titulus => titulus.coverage)
            }
        ]
    }

    const onClickHandler = (e) => {
        const points = chartRef.current.getElementsAtEventForMode(e, "nearest", {intersect: true}, true)
        if (points.length > 0) {
            const index = points[0].index
            const titulus_id = tituli[index].titulus.id
            dispatch(digestaActions.setChosenBookId(book_id))
            dispatch(digestaActions.setChosenTitulusId(titulus_id))
            dispatch(digestaActions.setChosenJuristId(jurysta_id))
            dispatch(uiActions.setActiveSection("juristsNav"))
            const url = `/jurysci/${jurysta_id}/digesta/${jurysta_id}#id=howdy`
            navigate(url)
        }
    }
    const plugins = [ChartDataLabels]

    const height = tituli.length
    return <ChartContainer height={height}>
        <Bar onClick={onClickHandler} ref={chartRef} data={data} options={options} plugins={plugins}/>
    </ChartContainer>


}

export default TituliCoverage