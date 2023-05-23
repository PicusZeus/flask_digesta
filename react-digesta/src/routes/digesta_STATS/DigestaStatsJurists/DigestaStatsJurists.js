import {Outlet} from "react-router-dom";
import {getDigestaStats, getJuristsStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import BooksAuthorshipChart from "../../../components/charts/BooksAuthorshipChart/BooksAuthorshipChart";
import {useState} from "react";


const getJuristsStatsQuery = () => {
    return {
        queryKey: ["stats", "digesta", "jurists"],
        queryFn: getJuristsStats
    }
}
const DigestaStatsJurists = () => {
    const [authorsSetIndex, setAuthorsSetIndex] = useState(0)
    const {data: authors} = useQuery(getJuristsStatsQuery())

    const authorsMoreOnePercent = authors.filter(author => (author.authorship > 1))
    const authorsLessOnePercentMoreOnePromile = authors.filter(author => (author.authorship <= 1 && author.authorship > 0.1))
    const authorsLessOnePromile = authors.filter(author=>(author.authorship <= 0.1))

    const authorsSets = [authorsMoreOnePercent, authorsLessOnePercentMoreOnePromile, authorsLessOnePromile]

    return (

        <>
            <button onClick={()=>setAuthorsSetIndex(0)}>pokaż jurystów z udziałem ponad jeden procent</button>
            <button onClick={()=>setAuthorsSetIndex(1)}>pokaż jurystów z udziałem poniżej jeden procent a więcej niż jeden promil</button>
            <button onClick={()=>setAuthorsSetIndex(2)}>pokaż jurystów z udziałem poniżej jeden promil</button>

            {authors && <BooksAuthorshipChart authors={authorsSets[authorsSetIndex]}/>}


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