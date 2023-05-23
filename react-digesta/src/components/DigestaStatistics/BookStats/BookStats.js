import {getBookStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import BooksShareChart from "../../charts/BooksShareChart/BooksShareChart";
import BooksAuthorshipChart from "../../charts/BooksAuthorshipChart/BooksAuthorshipChart";
import OperaShare from "../../charts/OperaShare/OperaBooksShare";
import BookShareChart from "../../charts/BookShareChart/BookShareChart";
import BookAuthorshipChart from "../../charts/BookAuthorshipChart/BookAuthorshipChart";
import BookOperaShareChart from "../../charts/BookOperaShareChart/BookOperaShareChart";

const getBookStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "books", id],
        queryFn: () => getBookStats(id)
    }
}
const BookStats = () => {

    const params = useParams()

    const {data: stats} = useQuery(getBookStatsQuery(params.book_id))


    let book
    if (stats) {
        book = <h1>{stats.book.book_latin_name}</h1>
    }

    return (
        <>
            {book}
            <h2>Tytuły i ich udział w objętości księgi</h2>
            {stats && <BookShareChart tituli={stats.tituli_book_share}/>}
            <h2>Juryści, których dzieła stanowią ponad 1% zawartości księgi</h2>
            {stats && <BookAuthorshipChart authors={stats.jurists_authorship}/>}
            <h2>Dzieła jurystów z udziałem powyżej pół procenta w objętości księgi</h2>
            {stats && <BookOperaShareChart opera={stats.opera_coverage}/>}
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