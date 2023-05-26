import {useParams} from "react-router-dom";
import {getJuristBookStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import TituliAuthorshipShareChart from "../../charts/TituliAuthorshipShareChart/TituliAuthorshipShareChart";
import OperaBookShare from "../../charts/BookOperaShareChart/BookOperaShareChart";
import Spinner from "../../UI/spinner/Spinner";
import classes from "./JuristBookStats.module.css"


const getJuristBookStatsQuery = (jurysta_id, book_id) => {
    return {
        queryKey: ["stats", "digesta", "jurists", jurysta_id, book_id],
        queryFn: () => getJuristBookStats(jurysta_id, book_id)
    }
}
const JuristBookStats = () => {
    const params = useParams()
    const {data: stats, isFetching} = useQuery(
        getJuristBookStatsQuery(params.jurysta_id, params.book_id)
    )
    if (isFetching) {
        return <Spinner/>
    }


    return <>
        {stats && <h1 className={classes.jurist_book_stats__title}>{stats.author.name} w księdze {stats.book.book_nr}</h1>}
        {stats && <h3 className={classes.jurist_book_stats__info}>Udział prac {stats.author.name}A w objętości księgi {stats.book.book_nr}</h3>}
        {stats && <h3 className={classes.jurist_book_stats__info}>Wybierz tytuł, dla którego chcesz poznać dodatkowe statystyki dla {stats.author.name}A</h3>}
        <div className={classes.chart}>{stats && <TituliAuthorshipShareChart tituli={stats.tituli}/>}</div>
        {stats && <h3 className={classes.jurist_book_stats__info}>Prace {stats.author.name}A w księdze {stats.book.book_nr}</h3>}
        <h3 className={classes.jurist_book_stats__info}>Wybierz pracę, dla której chcesz poznać dodatkowe statystyki dla księgi {stats.book.book_nr}</h3>
        <div className={classes.chart}>{stats && <OperaBookShare opera={stats.opera} book_id={stats.book.id}/>}</div>
    </>
}

export default JuristBookStats

export const loader = (queryClient) => async ({params}) => {
    const query = getJuristBookStatsQuery(params.jurysta_id, params.book_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}