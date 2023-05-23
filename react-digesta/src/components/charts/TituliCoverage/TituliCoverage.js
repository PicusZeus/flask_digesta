import {Bar} from "react-chartjs-2";
import {options} from "../chartOptions";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ChartContainer from "../ChartContainer/ChartContainer";
import {splitLabels} from "../../../services/helpers";

const TituliCoverage = ({tituli}) => {

    const data = {
        labels: tituli.map(titulus=>{
            const label = `${titulus.titulus.number} ${titulus.titulus.title_lat}`
            return splitLabels(label, 4)}),
        datasets: [
            {
                label: 'Udział pracy w zawartości tytułów',
                data: tituli.map(titulus=>titulus.coverage)
            }
        ]
    }

    const plugins = [ChartDataLabels]

    const height = tituli.length * 40
    return <ChartContainer height={height}>
           <Bar data={data} options={options} plugins={plugins}/>
    </ChartContainer>


}

export default TituliCoverage