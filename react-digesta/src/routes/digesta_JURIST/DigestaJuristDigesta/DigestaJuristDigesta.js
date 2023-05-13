import {json, Outlet, useLoaderData, useParams} from "react-router-dom";
import classes from './DigestaJuristDigesta.module.css'
import DigestaTocDesktopJuristDigestaBooks
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopJuristDigestaBooks/DigestaTocDesktopJuristDigestaBooks";
import DigestaTocMobileJuristDigestaBooks
    from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileJuristDigestaBooks/DigestaTocMobileJuristDigestaBooks";
import api from "../../../api/api";
import {useQuery} from "@tanstack/react-query";

const getJuristBooks = (id) => {
    return api.get("digesta/books/author/" + id).then((response) => {
        return response.data
    }).catch((e) => {
        throw json(
            {message: "Nie udało się załadować spisu treści Digestów dla jurysty"},
            {status: 500}
        )
    })
}

const getJuristBooksQuery = (id) => {
    return {
        queryKey: ['digesta', 'books', 'author', id],
        queryFn: () => getJuristBooks(id)
    }
}


const DigestaJuristDigesta = () => {
    const params = useParams()

    const author_id = params.jurysta_id
    const { data: books } = useQuery(getJuristBooksQuery(author_id))
    return (
        <div className={classes.toc_container}>
            <div className={classes.mobile_toc}>
                <DigestaTocMobileJuristDigestaBooks books={books} author_id={author_id}/>

            </div>
            <div className={classes.desktop_toc}>
                <DigestaTocDesktopJuristDigestaBooks books={books} author_id={author_id}/>

            </div>

            <div className={classes.toc_outlet}>
                <Outlet/>
            </div>

        </div>
    )
}

export default DigestaJuristDigesta


export const loader = (queryClient) =>  async ({params}) => {
    const query = getJuristBooksQuery(params.jurysta_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}
