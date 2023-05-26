import {getOpusStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import BooksOpusCoverage from "../../charts/BooksOpusCoverage/BooksOpusCoverage";
import Spinner from "../../UI/spinner/Spinner";
import classes from "./OpusStats.module.css";


const getOpusStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "opus", id],
        queryFn: () => getOpusStats(id)
    }
}
const OpusStats = () => {
    const params = useParams()
    const {data: stats, isFetching} = useQuery(getOpusStatsQuery(params.opus_id))

    if (isFetching) {
        return <Spinner/>
    }
    return (
        <>
            <h1 className={classes.opus_stats__title}>Libri {stats.opus.title_lat} {stats.opus.author.name}A</h1>
            <h3 className={classes.opus_stats__info}>Wybierz księgę, dla której chcesz zobaczyć udział tej pracy w tytułach</h3>
            {stats && <BooksOpusCoverage books={stats.books}/>}


        </>
    )
}
export default OpusStats

export const loader = (queryClient) => async ({params}) => {
    const query = getOpusStatsQuery(params.opus_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}