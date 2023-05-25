import {getJuristTitulusStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import OperaCoverageChart from "../../charts/OperaCoverageChart/OperaCoverageChart";
import Spinner from "../../UI/spinner/Spinner";

const getJuristTitulusStatsQuery = (jurysta_id, book_id, titulus_id) => {
    return {
        queryKey: ['statystyki', 'jurysci', jurysta_id, book_id, titulus_id],
        queryFn: () => getJuristTitulusStats(jurysta_id, book_id, titulus_id)
    }
}
const JuristTitulusStats = () => {

    const params = useParams()

    const {data: stats, isFetching} = useQuery(getJuristTitulusStatsQuery(params.jurysta_id, params.book_id, params.titulus_id))
    if (isFetching) {return <Spinner/>}

    return <>
        <h1>{stats.author.name} w tytule {stats.titulus.titulus.number} {stats.titulus.titulus.title_lat} w księdze {stats.titulus.titulus.book.book_nr}</h1>

        <OperaCoverageChart opera={stats.opera} book_id={stats.titulus.titulus.book.id}/>
    </>
}

export default JuristTitulusStats

export const loader = (queryClient) => async ({params}) => {
    const query = getJuristTitulusStatsQuery(params.jurysta_id, params.book_id, params.titulus_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

    )

}