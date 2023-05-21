import {getBookStats} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import BooksShareChart from "../../charts/BooksShareChart/BooksShareChart";
import AuhtorshipBooksChart from "../../charts/AuthorshipShare/AuhtorshipBooksChart";
import OperaShare from "../../charts/OperaShare/OperaBooksShare";
import BookShareChart from "../../charts/BooksShareChart/BookShareChart";
import PieAuthorshipBookChart from "../../charts/AuthorshipShare/PieAuthorshipBookChart";
import OperaBookShare from "../../charts/OperaShare/OperaBookShare";

const getBookStatsQuery = (id) => {
    return {
        queryKey: ["stats", "digesta", "books", id],
        queryFn: () => getBookStats(id)
    }
}
const BookStats = () => {

    const params = useParams()

    const { data: stats } = useQuery(getBookStatsQuery(params.book_id))

    console.log(stats)
    return (
        <>
               <div>Book stats</div>
                 <div>chart z tytułami i ich procentowym udziałem</div>
            {stats && <BookShareChart tituli={stats.tituli_book_share}/>}
            <div>pie z udziałem Jurystów</div>
            {stats && <PieAuthorshipBookChart authors={stats.jurists_authorship}/>}
            <div>pie z udziałem opera</div>
            {stats && <OperaBookShare opera={stats.opera_coverage}/>}
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