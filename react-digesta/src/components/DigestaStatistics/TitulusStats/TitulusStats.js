import {getTitulusStats} from "../../../api/api";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import PieAuthorshipBookChart from "../../charts/AuthorshipShare/PieAuthorshipBookChart";
import OperaBookShare from "../../charts/OperaShare/OperaBookShare";

const getTitulusStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "tituli", id],
        queryFn: () => getTitulusStats(id)
    }
}
const TitulusStats = () => {


    const params = useParams()

    const {data: stats} = useQuery(getTitulusStatsQuery(params.titulus_id))

    console.log(stats)
    return (
        <>
            <div>titulus stats</div>


            <div>pie z udziałem Jurystów</div>
            {stats && <PieAuthorshipBookChart authors={stats.jurists_authorship}/> }

            <div>pie z udziałem opera</div>
            {stats && <OperaBookShare opera={stats.opera_coverage}/>}
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