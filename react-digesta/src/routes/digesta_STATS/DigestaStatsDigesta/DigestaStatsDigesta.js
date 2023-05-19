import {Outlet} from "react-router-dom";
import {getDigestaStats} from "../../../api/api";

const getDigestaStatsQuery = () => {
    return {
        queryKey: ["stats", "digesta", "books"],
        queryFn: getDigestaStats
    }
}
const DigestaStatsDigesta = () => {


    return (
        <>
       <h1>Digest</h1>

            <div>chart z księgami i ich procentowym udziałem</div>

            <div>pie z udziałem Jurystów ok</div>

            <div>pie z udziałem opera</div>

            <h4>spis ksiąg</h4>

            <Outlet/>

        </>

    )
}

export default DigestaStatsDigesta

export const loader = (queryClient) => async () => {
    const query = getDigestaStatsQuery()
    return (
        queryClient.getQueryData(query.queryKey)
    )
}