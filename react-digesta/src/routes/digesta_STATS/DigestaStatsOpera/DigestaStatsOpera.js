import {getOperaStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import OperaCoverageChart from "../../../components/charts/OperaCoverageChart/OperaCoverageChart";
import {useState} from "react";
import Spinner from "../../../components/UI/spinner/Spinner";
import classes from "./DigestaStatsOpera.module.css"

const getOperaStatsQuery = () => {
    return {
        queryKey: ["stats", "digesta", "opera"],
        queryFn: getOperaStats
    }
}

const DigestaStatsOpera = () => {
    const [chartOperaIndex, setChartOperaIndex] = useState(0)

    const {data: opera, isFetching} = useQuery(getOperaStatsQuery())

    if (isFetching) {
        return <Spinner/>
    }
    const operaAbovePercent = opera.filter(opus => opus.coverage > 1)
    const operaLessOneMoreHalf = opera.filter(opus => opus.coverage <= 1 && opus.coverage > 0.5)
    const operaLessHalfMoreTenth = opera.filter(opus => opus.coverage <= 0.5 && opus.coverage > 0.1)
    const operaLessTenthMoreFiftinth = opera.filter(opus => opus.coverage <= 0.1 && opus.coverage > 0.05)
    const operaLessFiftinthMorehudreth = opera.filter(opus => opus.coverage <= 0.05 && opus.coverage > 0.01)
    const operaLessHundretth = opera.filter(opus => opus.coverage <= 0.01)
    const onOption = (e) => {
        e.preventDefault()
        const index = parseInt(e.target.value)
        setChartOperaIndex(index)

    }
    const operaSets = [operaAbovePercent, operaLessOneMoreHalf, operaLessHalfMoreTenth, operaLessTenthMoreFiftinth, operaLessFiftinthMorehudreth, operaLessHundretth]
    return (

        <>
            <h1>Prace jurystów cytowane w Digestach</h1>
            <h3>Wybierz pracę jurysty, o której chcesz się dowiedzieć więcej.</h3>

            <form className={classes.opera_stats__options}>
                <label htmlFor="selectOpera">Pokaż prace jurystów z udziałem</label>
                <select id="selectOpera" onChange={onOption}>
                    <option value='0'> ponad jeden procent</option>
                    <option value='1'>poniżej jednego procenta a powyżej pół
                        procenta
                    </option>
                    <option value='2'>poniżej pół procenta a powyżej jednego
                        promila
                    </option>
                    <option value="3"> poniżej jednego promila a powyżej pół
                        promila
                    </option>
                    <option value="4">poniżej pół promila a powyżej
                        dziesiątej części promila
                    </option>
                    <option value="5">poniżej dziesiątej części promila
                    </option>

                </select>
            </form>


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