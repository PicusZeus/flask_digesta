import {getJuristStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import BooksAuthorshipShareChart from "../../charts/BooksAuthorshipShareChart/BooksAuthorshipShareChart";
import OperaCoverageChart from "../../charts/OperaCoverageChart/OperaCoverageChart";
import {useState} from "react";
import Spinner from "../../UI/spinner/Spinner";
import classes from "./JuristStats.module.css"


const getJuristStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "jurists", id],
        queryFn: () => getJuristStats(id)
    }
}
const JuristStats = () => {
    const [operaSetIndex, setOperaSetIndex] = useState(0)
    const params = useParams()

    const {data: stats, isFetching} = useQuery(getJuristStatsQuery(params.jurysta_id))
    if (isFetching) {
        return <Spinner/>
    }

    const operaMoreHalfPercent = stats.opera.filter(o => o.coverage > 0.1)
    const operaLessHalfPercent = stats.opera.filter(o => o.coverage <= 0.1)
    const operaSets = [operaMoreHalfPercent, operaLessHalfPercent]
    const onOption = (e) => {
        e.preventDefault()
        const index = parseInt(e.target.value)
        setOperaSetIndex(index)

    }
    return (
        <>
            {stats && <h1 className={classes.jurist_stats__title}>{stats.jurist.name} w Digestach</h1>}
            <h2 className={classes.jurist_stats__info}>Udział prac {stats.jurist.name}A w poszczególnych księgach</h2>
            <h3 className={classes.jurist_stats__info}>Wybierz księgę, dla której chcesz poznać spis i udział prac {stats.jurist.name}A</h3>
            {stats && <BooksAuthorshipShareChart books={stats.books}/>}

            {stats && <h2 className={classes.jurist_stats__info}>Prace {stats.jurist.name}A i ich udział w Digestach</h2>}
            <h3 className={classes.jurist_stats__info}>Wybierz pracę, dla której chcesz poznać jej udział w poszczególnych księgach Digestów</h3>
            <form className={classes.jurist_stats__form}>
                <label htmlFor="selectJurs">Zobacz jurystów z udziałem</label>
                <select id="selectJurs" onChange={onOption}>
                    <option value='0'>ponad jeden promil</option>
                    <option value='1'> poniżej promila</option>
                </select>
            </form>

            {stats && <OperaCoverageChart opera={operaSets[operaSetIndex]}/>}


        </>
    )
}

export default JuristStats

export const loader = (queryClient) => async ({params}) => {
    const query = getJuristStatsQuery(params.jurysta_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}