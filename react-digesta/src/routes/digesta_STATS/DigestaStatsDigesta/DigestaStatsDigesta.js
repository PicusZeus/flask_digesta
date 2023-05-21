import {Outlet} from "react-router-dom";
import {getDigestaStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import BooksShareChart from "../../../components/charts/BooksShareChart/BooksShareChart";
import AuhtorshipBooksChart from "../../../components/charts/AuthorshipShare/AuhtorshipBooksChart";
import DoughnatOperaShare from "../../../components/charts/OperaShare/OperaBooksShare";
import OpusStats from "../../../components/DigestaStatistics/OpusStats/OpusStats";
import OperaShare from "../../../components/charts/OperaShare/OperaBooksShare";
import OperaBooksShare from "../../../components/charts/OperaShare/OperaBooksShare";

const getDigestaStatsQuery = () => {
    return {
        queryKey: ["stats", "digesta", "books"],
        queryFn: getDigestaStats
    }
}
const DigestaStatsDigesta = () => {
    const { data: stats } = useQuery(getDigestaStatsQuery())
    console.log(stats)
    return (
        <>
       <h1>Digest</h1>
           <div>chart z księgami i ich procentowym udziałem</div>
            {stats && <BooksShareChart books={stats}/>}



            <div>pie z udziałem Jurystów ok</div>
            {/*{stats && <AuhtorshipBooksChart authors={stats.jurists_authorship}/>}*/}

            <div>pie z udziałem opera</div>
            {/*{stats && <OperaBooksShare opera={stats.opera_coverage}/>}*/}
            {/*{stats && <DoughnatOperaShare opera={stats.opera_coverage}/> }*/}

            <h4>spis ksiąg</h4>

            {/*<Outlet/>*/}

        </>

    )
}

export default DigestaStatsDigesta

export const loader = (queryClient) => async () => {
    const query = getDigestaStatsQuery()
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}