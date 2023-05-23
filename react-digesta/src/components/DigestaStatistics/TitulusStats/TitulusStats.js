import {getTitulusStats} from "../../../api/api";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import BookAuthorshipChart from "../../charts/BookAuthorshipChart/BookAuthorshipChart";
import BookOperaShareChart from "../../charts/BookOperaShareChart/BookOperaShareChart";

const getTitulusStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "tituli", id],
        queryFn: () => getTitulusStats(id)
    }
}
const TitulusStats = () => {


    const params = useParams()

    const {data: stats} = useQuery(getTitulusStatsQuery(params.titulus_id))

    console.log(stats, 'STATS')
    return (
        <>
            {stats && <h1>Księga {stats.titulus.book.book_latin_name} tytuł {stats.titulus.number} {stats.titulus.title_lat}</h1>}


            {stats && <BookAuthorshipChart authors={stats.jurists_authorship}/> }

            <h3>Prace wykorzystane w tym tytule</h3>
            {stats && <BookOperaShareChart opera={stats.opera_coverage}/>}
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