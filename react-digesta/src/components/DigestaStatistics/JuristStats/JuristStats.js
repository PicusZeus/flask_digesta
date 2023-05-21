import {getJuristStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import BooksAuthorshipShare from "../../charts/BooksAuthorshipShare/BooksAuthorshipShare";



const getJuristStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "jurists", id],
        queryFn: () => getJuristStats(id)
    }
}
const JuristStats = () => {

    const params = useParams()
    console.log(params.jurysta_id)

    const { data: stats } = useQuery(getJuristStatsQuery(params.jurysta_id))
    console.log(stats)


    return (
        <>
        <div>chart dla ksiąg</div>
            {stats && <BooksAuthorshipShare books={stats}/>}

            <div>chart dla tytułów</div>


        <div>Jurystat stats</div>
            </>
    )
}

export default JuristStats

export const loader = (queryClient) => async ({params}) => {
    const query = getJuristStatsQuery(params.jurysta_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}