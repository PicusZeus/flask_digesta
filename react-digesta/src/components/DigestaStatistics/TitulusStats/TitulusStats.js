import {getTitulusStats} from "../../../api/api";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import BookAuthorshipChart from "../../charts/BookAuthorshipChart/BookAuthorshipChart";
import BookOperaShareChart from "../../charts/BookOperaShareChart/BookOperaShareChart";
import {useState} from "react";
import Spinner from "../../UI/spinner/Spinner";
import classes from "../../../routes/digesta_STATS/DigestaStatsJurists/DigestaStatsJurists.module.css";

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
            {stats &&
                <h1>Księga {stats.titulus.book.book_latin_name} tytuł {stats.titulus.number} {stats.titulus.title_lat}</h1>}

            <h3>Wybierz jurystę, o którym chcesz się dowiedzieć więcej</h3>
            <form className={classes.titulus_stats__options}>
                <label htmlFor="selectJurs">Zobacz jurystów z udziałem w tytule</label>
                <select id="selectJurs" onChange={onOptionJr}>
                    <option value='0'>ponad pięć procent</option>
                    <option value='1'>poniżej pięciu procent</option>
                </select>
            </form>

            {stats && <BookAuthorshipChart authors={authorsSets[authorsSetIndex]} book_id={stats.titulus.book.id}
                                           titulus_id={stats.titulus.id}/>}

            <h3>Wybierz pracę cytowaną w tej księdze</h3>
            <form className={classes.titulus_stats__options}>
                <label htmlFor="selectOpera">Zobacz prace z udziałem w tym tytule</label>
                <select id="selectOpera" onChange={onOptionOp}>
                    <option value='0'>ponad pięć procent</option>
                    <option value='1'>poniżej pięciu procent</option>

                </select>
            </form>

            {stats && <BookOperaShareChart opera={operaSets[operaSetIndex]} book_id={stats.titulus.book.id}/>}
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