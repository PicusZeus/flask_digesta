import {getOpusBookStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import TituliCoverage from "../../charts/TituliCoverage/TituliCoverage";
import {useRef} from "react";


const getOpusBookStatsQuery = (opus_id, book_id) => {
    return {
        queryKey: ['stats', 'digesta', 'opera', opus_id, book_id],
        queryFn: ()=>getOpusBookStats(opus_id, book_id)
    }
}
const OpusBookStats = () => {

    const params = useParams()

    const { data: stats } = useQuery(getOpusBookStatsQuery(params.opus_id, params.book_id))
    console.log(stats)

    return <>
        <h1>Libri {stats.opus.title_lat} {stats.opus.author.name}A w księdze {stats.book.book_nr}</h1>
        {stats && <TituliCoverage tituli={stats.tituli} book_id={stats.book.id} jurysta_id={stats.opus.author.id}/>}
    </>
}

export default OpusBookStats

export const loader = (queryClient) => async ({params}) => {
    const query = getOpusBookStatsQuery(params.opus_id, params.book_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}