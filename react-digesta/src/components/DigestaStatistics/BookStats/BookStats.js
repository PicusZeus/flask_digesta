import {getBookStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import BookShareChart from "../../charts/BookShareChart/BookShareChart";
import BookAuthorshipChart from "../../charts/BookAuthorshipChart/BookAuthorshipChart";
import BookOperaShareChart from "../../charts/BookOperaShareChart/BookOperaShareChart";
import {useState} from "react";
import Spinner from "../../UI/spinner/Spinner";

const getBookStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "books", id],
        queryFn: () => getBookStats(id)
    }
}
const BookStats = () => {
    const [authorshipSetIndex, setAuthorshipSetIndex] = useState(0)
    const [operaSetIndex, setOperaSetIndex] = useState(0)
    const params = useParams()

    const {data: stats, isFetching} = useQuery(getBookStatsQuery(params.book_id))

    if (isFetching) {return <Spinner/>}

    let book
    if (stats) {
        book = <h1>{stats.book.book_latin_name}</h1>
    }
    const authorsMoreOnePercent = stats.jurists_authorship.filter(j => {
        return j.authorship > 1
    })
    const authorsLessOnePercent = stats.jurists_authorship.filter(j => {
        return j.authorship <= 1
    })

    const authorsSets = [authorsMoreOnePercent, authorsLessOnePercent]

    const operaMoreOnePercent = stats.opera_coverage.filter(o => {
        return o.coverage > 1
    })
    const operaLessOnePercentMoreOnePromile = stats.opera_coverage.filter(o => {
        return o.coverage <= 1 && o.coverage > 0.1
    })
    const operaLessOnePromile = stats.opera_coverage.filter(o => {
        return o.coverage <= 0.1
    })

    console.log(stats, 'bookstats')
    const operaSets = [operaMoreOnePercent, operaLessOnePercentMoreOnePromile, operaLessOnePromile]
    return (
        <>
            {book}
            <h2>Tytuły i ich udział w objętości księgi</h2>
            {stats && <BookShareChart tituli={stats.tituli_book_share}/>}
            <h2>Juryści i ich udział w księdze</h2>
            <button onClick={() => setAuthorshipSetIndex(0)}>Pokaż Jurystów z udziałem ponad jeden procent w księdze
            </button>
            <button onClick={() => setAuthorshipSetIndex(1)}>Pokaż Jurystów z udziałem mniejszym niż jeden procent w
                księdze
            </button>
            {stats && <BookAuthorshipChart authors={authorsSets[authorshipSetIndex]} book_id={stats.book.id}/>}
            <h2>Dzieła jurystów i ich udział w księdze</h2>
            <button onClick={() => setOperaSetIndex(0)}>Powyżej jednego procenta</button>
            <button onClick={() => setOperaSetIndex(1)}>Poniżej jednego procenta ponad jeden promil</button>
            <button onClick={() => setOperaSetIndex(2)}>Poniżej jednego promila</button>

            {stats && <BookOperaShareChart opera={operaSets[operaSetIndex]} book_id={stats.book.id}/>}
        </>

    )
}

export default BookStats

export const loader = (queryClient) => async ({params}) => {
    const query = getBookStatsQuery(params.book_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}