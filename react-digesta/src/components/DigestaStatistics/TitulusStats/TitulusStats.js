import {getTitulusStats} from "../../../api/api";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import BookAuthorshipChart from "../../charts/BookAuthorshipChart/BookAuthorshipChart";
import BookOperaShareChart from "../../charts/BookOperaShareChart/BookOperaShareChart";
import {useState} from "react";
import Spinner from "../../UI/spinner/Spinner";
import classes from "./TitulusStats.module.css";

const getTitulusStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "tituli", id],
        queryFn: () => getTitulusStats(id)
    }
}
const TitulusStats = () => {
    const [authorsSetIndex, setAuthorsSetIndex] = useState(0)
    const [operaSetIndex, setOperaSetIndex] = useState(0)

    const params = useParams()

    const {data: stats, isFetching} = useQuery(getTitulusStatsQuery(params.titulus_id))

    if (isFetching) {
        return <Spinner/>
    }
    const authorsMoreFivePercent = stats.jurists_authorship.filter(a => a.authorship > 5)
    const authorsLessFivePercent = stats.jurists_authorship.filter(a => a.authorship <= 5)


    const authorsSets = [authorsMoreFivePercent, authorsLessFivePercent]

    const operaMoreFivePercent = stats.opera_coverage.filter(o => o.coverage > 5)
    const operaLessFivePercent = stats.opera_coverage.filter(o => o.coverage <= 5)

    const operaSets = [operaMoreFivePercent, operaLessFivePercent]


    const onOptionJr = (e) => {
        e.preventDefault()
        const index = parseInt(e.target.value)
        setAuthorsSetIndex(index)
    }

    const onOptionOp = (e) => {
        e.preventDefault()
        const index = parseInt(e.target.value)
        setOperaSetIndex(index)
    }
    return (
        <>
            <h1 className={classes.titulus_stats__title}>Księga {stats.titulus.book.book_nr}</h1>
            <h2 className={classes.titulus_stats__subtitle}>tytuł {stats.titulus.number} </h2>
            <h2 className={classes.titulus_stats__subtitle}>{stats.titulus.title_lat}</h2>
            <h3 className={classes.titulus_stats__info}>Wybierz jurystę, dla którego chcesz poznać listę jego prac
                zawartych w tym tytule</h3>

            <form className={classes.titulus_stats__options}>
                <label htmlFor="selectJurs">Zobacz jurystów z udziałem w tytule</label>
                <select id="selectJurs" onChange={onOptionJr}>
                    <option value='0'>ponad pięć procent</option>
                    <option value='1'>poniżej pięciu procent</option>
                </select>
            </form>

            <BookAuthorshipChart authors={authorsSets[authorsSetIndex]} book_id={stats.titulus.book.id}
                                 titulus_id={stats.titulus.id}/>

            <h3 className={classes.titulus_stats__info}>Wybierz pracę cytowaną w tym tytule, dla której chcesz poznać jej udział we poszczególnych tytułach księgi</h3>
            <form className={classes.titulus_stats__options}>
                <label htmlFor="selectOpera">Zobacz prace z udziałem w tym tytule</label>
                <select id="selectOpera" onChange={onOptionOp}>
                    <option value='0'>ponad pięć procent</option>
                    <option value='1'>poniżej pięciu procent</option>

                </select>
            </form>

            <BookOperaShareChart opera={operaSets[operaSetIndex]} book_id={stats.titulus.book.id}/>
        </>
    )
}

export default TitulusStats

export const loader = (queryClient) => async ({params}) => {
    const query = getTitulusStatsQuery(params.titulus_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

    )
}