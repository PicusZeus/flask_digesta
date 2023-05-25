import {getBookStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import BookShareChart from "../../charts/BookShareChart/BookShareChart";
import BookAuthorshipChart from "../../charts/BookAuthorshipChart/BookAuthorshipChart";
import BookOperaShareChart from "../../charts/BookOperaShareChart/BookOperaShareChart";
import {useState} from "react";
import Spinner from "../../UI/spinner/Spinner";
import classes from "./BookStats.module.css";

const getBookStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "books", id],
        queryFn: () => getBookStats(id)
    }
}
const BookStats = () => {
    const [authorshipSetIndex, setAuthorshipSetIndex] = useState(0)
    const [operaSetIndex, setOperaSetIndex] = useState(0)
    const params = useParams()

    const {data: stats, isFetching} = useQuery(getBookStatsQuery(params.book_id))

    if (isFetching) {
        return <Spinner/>
    }


    const authorsMoreOnePercent = stats.jurists_authorship.filter(j => {
        return j.authorship > 1
    })
    const authorsLessOnePercent = stats.jurists_authorship.filter(j => {
        return j.authorship <= 1
    })

    const authorsSets = [authorsMoreOnePercent, authorsLessOnePercent]

    const operaMoreOnePercent = stats.opera_coverage.filter(o => {
        return o.coverage > 1
    })
    const operaLessOnePercentMoreOnePromile = stats.opera_coverage.filter(o => {
        return o.coverage <= 1 && o.coverage > 0.1
    })
    const operaLessOnePromile = stats.opera_coverage.filter(o => {
        return o.coverage <= 0.1
    })

    const onOptionJr = (e) => {
        e.preventDefault()
        const index = parseInt(e.target.value)
        setAuthorshipSetIndex(index)
    }

    const onOptionOp = (e) => {
        e.preventDefault()
        const index = parseInt(e.target.value)
        setOperaSetIndex(index)
    }

    const operaSets = [operaMoreOnePercent, operaLessOnePercentMoreOnePromile, operaLessOnePromile]
    return (
        <>

            {stats && <h1 className={classes.book_stats__title}>{stats.book.book_latin_name}</h1>}
            {stats && <h2 className={classes.book_stats__subtitle}>KSIĘGA {stats.book.book_nr}</h2>}
            <h3 className={classes.book_stats__info}>Tytuły i ich udział w objętości księgi</h3>
            <h3 className={classes.book_stats__info}>Wybierz tytuł, dla którego chcesz poznać dalsze statystyki</h3>
            {stats && <BookShareChart tituli={stats.tituli_book_share}/>}
            <h3 className={classes.book_stats__info}>Juryści i ich udział w objętości księgi</h3>
            <h3 className={classes.book_stats__info}>Wybierz jurystę, dla którego chcesz poznać dalsze statystyki w ramach tej księgi</h3>
            <form className={classes.book_stats__options}>
                <label htmlFor="selectJurs">Zobacz jurystów z udziałem w księdze</label>
                <select id="selectJurs" onChange={onOptionJr}>
                    <option value='0'>ponad jeden procent</option>
                    <option value='1'>mniejszym niż jeden procent</option>

                </select>
            </form>

            {stats && <BookAuthorshipChart authors={authorsSets[authorshipSetIndex]} book_id={stats.book.id}/>}


            <h3 className={classes.book_stats__info}>Dzieła jurystów i ich udział w objętości księgi</h3>
            <h3 className={classes.book_stats__info}>Wybierz pracę, dla której chcesz poznać dalsze statystyki w ramach tej księgi</h3>
            <form className={classes.book_stats__options}>
                <label htmlFor="selectOpera">Zobacz prace z udziałem w księdze</label>
                <select id="selectOpera" onChange={onOptionOp}>
                    <option value='0'>ponad jeden procent</option>
                    <option value='1'>poniżej jednego procenta a ponad jeden promil</option>
                    <option value="2">poniżej jednego promila</option>

                </select>
            </form>

            {stats && <BookOperaShareChart opera={operaSets[operaSetIndex]} book_id={stats.book.id}/>}
        </>

    )
}

export default BookStats

export const loader = (queryClient) => async ({params}) => {
    const query = getBookStatsQuery(params.book_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}