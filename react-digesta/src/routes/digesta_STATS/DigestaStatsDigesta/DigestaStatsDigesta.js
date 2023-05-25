import {getDigestaStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import BooksShareChart from "../../../components/charts/BooksShareChart/BooksShareChart";
import Spinner from "../../../components/UI/spinner/Spinner";
import classes from "./DigestaStatsDigesta.module.css"

const getDigestaStatsQuery = () => {
    return {
        queryKey: ["stats", "digesta", "books"],
        queryFn: getDigestaStats
    }
}
const DigestaStatsDigesta = () => {
    const {data: stats, isFetching} = useQuery(getDigestaStatsQuery())
    if (isFetching) {
        return <Spinner/>
    }

    return (
        <>

            <h1>Digesta albo Pandekta</h1>
            <h3>Digesta lub pandekta składają się z 50 ksiąg o różnej długości</h3>
            {stats && <BooksShareChart books={stats}/>}


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