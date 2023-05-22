import {useParams} from "react-router-dom";
import {getJuristBookStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import TituliAuthorshipShare from "../../charts/TituliAuthorshipShare/TituliAuthorshipShare";
import OperaBookShare from "../../charts/OperaShare/OperaBookShare";

const getJuristBookStatsQuery = (jurysta_id, book_id) => {
    return {
        queryKey: ["stats", "digesta", "jurists", jurysta_id, book_id],
        queryFn: () => getJuristBookStats(jurysta_id, book_id)
    }
}
const JuristBookStats = () => {
    const params = useParams()
    console.log(params)
    const {data: stats} = useQuery(
        getJuristBookStatsQuery(params.jurysta_id, params.book_id)
    )

    console.log(stats)



    return <>
        {stats && <TituliAuthorshipShare tituli={stats.tituli}/>}
        {stats && <OperaBookShare opera={stats.opera}/>}
    </>
}

export default JuristBookStats

export const loader = (queryClient) => async ({params}) => {
    const query = getJuristBookStatsQuery(params.jurysta_id, params.book_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}