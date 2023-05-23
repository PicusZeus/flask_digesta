import {getTitulusStats} from "../../../api/api";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import BookAuthorshipChart from "../../charts/BookAuthorshipChart/BookAuthorshipChart";
import BookOperaShareChart from "../../charts/BookOperaShareChart/BookOperaShareChart";
import juristTitulusStats from "../JuristTitulusStats/JuristTitulusStats";
import {useState} from "react";

const getTitulusStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "tituli", id],
        queryFn: () => getTitulusStats(id)
    }
}
const TitulusStats = () => {
    const [authorsSetIndex, setAuthorsSetIndex] = useState(0)
    const [operaSetIndex, setOperaSetIndex] = useState(0)

    const params = useParams()

    const {data: stats} = useQuery(getTitulusStatsQuery(params.titulus_id))

    console.log(stats, 'STATS')

    const authorsMoreOnePercent = stats.jurists_authorship.filter(a => a.authorship > 1)
    const authorsLessOnePercent = stats.jurists_authorship.filter(a => a.authorship <= 1)

    const authorsSets = [authorsMoreOnePercent, authorsLessOnePercent]

    const operaMoreOnePercent = stats.opera_coverage.filter(o => o.coverage > 1)
    // const operaLessOnePercentMoreHalfPercent = stats.opera_coverage.filter(o => o.coverage <= 1 && o.coverage > 0.5)
    const operaLessOnePercent = stats.opera_coverage.filter(o => o.coverage <= 1)

    const operaSets = [operaMoreOnePercent, operaLessOnePercent]

    return (
        <>
            {stats &&
                <h1>Księga {stats.titulus.book.book_latin_name} tytuł {stats.titulus.number} {stats.titulus.title_lat}</h1>}

            <h3>Udział prac jurysty w tytule</h3>
            <button onClick={() => setAuthorsSetIndex(0)}>Powyżej jednego procenta</button>
            <button onClick={() => setAuthorsSetIndex(1)}>Poniżej jednego procenta</button>

            {stats && <BookAuthorshipChart authors={authorsSets[authorsSetIndex]} book_id={stats.titulus.book.id} titulus_id={stats.titulus.id}/>}

            <h3>Udział prac wykorzystanych w tym tytule</h3>
            <button onClick={() => setOperaSetIndex(0)}>Powyżej jednego procenta</button>
            <button onClick={() => setOperaSetIndex(1)}>Poniżej jednego procenta </button>


            {stats && <BookOperaShareChart opera={operaSets[operaSetIndex]} book_id={stats.titulus.book.id}/>}
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