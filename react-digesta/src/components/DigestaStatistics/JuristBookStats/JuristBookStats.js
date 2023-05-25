import {useParams} from "react-router-dom";
import {getJuristBookStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import TituliAuthorshipShareChart from "../../charts/TituliAuthorshipShareChart/TituliAuthorshipShareChart";
import OperaBookShare from "../../charts/BookOperaShareChart/BookOperaShareChart";
import Spinner from "../../UI/spinner/Spinner";

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
        {stats && <h1>{stats.author.name} w księdze {stats.book.book_nr}</h1>}
        <h3>Udział w poszczególnych tytułach</h3>
        {stats && <TituliAuthorshipShareChart tituli={stats.tituli}/>}
        <h3>Udział prac jurysty w księdze</h3>
        {stats && <OperaBookShare opera={stats.opera} book_id={stats.book.id}/>}
    </>
}

export default JuristBookStats

export const loader = (queryClient) => async ({params}) => {
    const query = getJuristBookStatsQuery(params.jurysta_id, params.book_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}