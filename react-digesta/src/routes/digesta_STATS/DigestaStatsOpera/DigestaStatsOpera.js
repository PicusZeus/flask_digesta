import {Outlet} from "react-router-dom";
import {getOperaStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import OperaCoverageChart from "../../../components/charts/OperaCoverageChart/OperaCoverageChart";
import {useState} from "react";

const getOperaStatsQuery = () => {
    return {
        queryKey: ["stats", "digesta", "opera"],
        queryFn: getOperaStats
    }
}

const DigestaStatsOpera = () => {
    const [chartOperaIndex, setChartOperaIndex] = useState(0)

    const {data: opera} = useQuery(getOperaStatsQuery())
    // console.log(stats)
    const operaAbovePercent = opera.filter(opus => opus.coverage > 1)
    const operaLessOneMoreHalf = opera.filter(opus => opus.coverage <= 1 && opus.coverage > 0.5)
    const operaLessHalfMoreTenth = opera.filter(opus => opus.coverage <= 0.5 && opus.coverage > 0.1)
    const operaLessTenthMoreFiftinth = opera.filter(opus => opus.coverage <= 0.1 && opus.coverage > 0.05)
    const operaLessFiftinthMorehudreth = opera.filter(opus => opus.coverage <= 0.05 && opus.coverage > 0.01)
    const operaLessHundretth = opera.filter(opus => opus.coverage <= 0.01)

    const operaSets = [operaAbovePercent, operaLessOneMoreHalf, operaLessHalfMoreTenth, operaLessTenthMoreFiftinth, operaLessFiftinthMorehudreth, operaLessHundretth]
    return (

        <>
            <h1>Prace jurystów cytowane w Digestach</h1>
            <button onClick={() => setChartOperaIndex(0)}>Pokaż prace z udziałem powyżej jednego procenta</button>
            <button onClick={() => setChartOperaIndex(1)}>Pokaż prace z udziałem poniżej jednego procenta a powyżej pół
                procenta
            </button>
            <button onClick={() => setChartOperaIndex(2)}>Pokaż prace z udziałem poniżej pół procenta a powyżej jednego
                promila
            </button>
            <button onClick={() => setChartOperaIndex(3)}>Pokaż prace z udziałem poniżej jednego promila a powyżej pół
                promila
            </button>
            <button onClick={() => setChartOperaIndex(4)}>Pokaż prace z udziałem poniżej pół promila a powyżej
                dziesiątej części promila

            </button>
         <button onClick={() => setChartOperaIndex(5)}>Pokaż prace z udziałem poniżej dziesiątej części promila

            </button>
            {opera && <OperaCoverageChart opera={operaSets[chartOperaIndex]}/>}
        </>
    )
}

export default DigestaStatsOpera

export const loader = (queryClient) => async () => {
    const query = getOperaStatsQuery()
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}