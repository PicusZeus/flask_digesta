import {getJuristStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import BooksAuthorshipShareChart from "../../charts/BooksAuthorshipShareChart/BooksAuthorshipShareChart";
import OperaCoverageChart from "../../charts/OperaCoverageChart/OperaCoverageChart";



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
            {stats && <h1>{stats.jurist.name} w Digestach</h1>}
            <h2>Udział w poszczególnych księgach</h2>
            {stats && <BooksAuthorshipShareChart books={stats.books}/>}

            {stats && <h2>Prace {stats.jurist.name}A i ich udział w Digestach</h2>}
            {stats && <OperaCoverageChart opera={stats.opera}/> }


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