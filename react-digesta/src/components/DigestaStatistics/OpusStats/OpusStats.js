import {getOpusStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import BooksOpusCoverage from "../../charts/BooksOpusCoverage/BooksOpusCoverage";


const getOpusStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "opus", id],
        queryFn: ()=>getOpusStats(id)
    }
}
const OpusStats = () => {
    const params = useParams()
    const { data: stats } = useQuery(getOpusStatsQuery(params.opus_id))
    console.log(stats)
    return (
               <>
                   <h1>Libri {stats.opus.title_lat} {stats.opus.author.name}A</h1>
                   <h3> Udział pracy w księgach Digestów </h3>
                   {stats && <BooksOpusCoverage books={stats.books}/>}

            <div>chart dla tytułów</div>


        <div>opus stats</div>
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