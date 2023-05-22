import {Outlet} from "react-router-dom";
import {getOperaStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import OperaCoverage from "../../../components/charts/OperaCoverage/OperaCoverage";

const getOperaStatsQuery = () => {
    return {
        queryKey: ["stats", "digesta", "opera"],
        queryFn: getOperaStats
    }
}

const DigestaStatsOpera = () => {

    const { data: stats } = useQuery(getOperaStatsQuery())
    console.log(stats)
    return (

        <>
            <h1>Opera</h1>
            <div> spis dzieł</div>
            {stats && <OperaCoverage opera={stats}/> }
            <Outlet/>
        </>
    )
}

export default DigestaStatsOpera

export const loader = (queryClient) => async () => {
    const query = getOperaStatsQuery()
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}