import {Outlet} from "react-router-dom";
import {getDigestaStats, getJuristsStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import AuthorshipBooksChart from "../../../components/charts/AuthorshipShare/AuthorshipBooksChart";


const getJuristsStatsQuery = () => {
    return {
        queryKey: ["stats", "digesta", "jurists"],
        queryFn: getJuristsStats
    }
}
const DigestaStatsJurists = () => {

    const {data: stats} = useQuery(getJuristsStatsQuery())
    console.log(stats)
    return (

        <>
            <h1>Juryśli</h1>
            {stats && <AuthorshipBooksChart authors={stats}/>}
            <div>wykres liniowy z objętością wg wieku Jurysty</div>


            <h4>Chart z jurystami i ich procentowym udziałem</h4>
            <Outlet/>
        </>
    )
}
export default DigestaStatsJurists

export const loader = (queryClient) => async () => {
    const query = getJuristsStatsQuery()
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}