import { Outlet, useParams} from "react-router-dom";
import classes from './DigestaJuristDigesta.module.css'
import DigestaTocDesktopJuristDigestaBooks
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopJuristDigestaBooks/DigestaTocDesktopJuristDigestaBooks";
import DigestaTocMobileJuristDigestaBooks
    from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileJuristDigestaBooks/DigestaTocMobileJuristDigestaBooks";
import {useQuery} from "@tanstack/react-query";
import {getJuristBooks} from "../../../api/api";
import {useSelector} from "react-redux";


const getJuristBooksQuery = (id) => {
    return {
        queryKey: ['digesta', 'books', 'author', id],
        queryFn: () => getJuristBooks(id)
    }
}


const DigestaJuristDigesta = ({location}) => {
    const params = useParams()
    console.log(location)
    const author_id = params.jurysta_id
    const { data: books } = useQuery(getJuristBooksQuery(author_id))
    // const chosenTitulusId = useSelector(state=>state.digesta.chosenTitulusId)
    //     if (chosenTitulusId) {
    //     const titulusSection = document.querySelector("#" + chosenTitulusId)
    //     titulusSection.scrollIntoView({behavior: "smooth", block: "start"})
    // }
    return (

        <div className={classes.toc_container}>
            <div className={classes.mobile_toc}>
                {books && <DigestaTocMobileJuristDigestaBooks books={books} author_id={author_id}/>}

            </div>
            <div className={classes.desktop_toc}>
                {books && <DigestaTocDesktopJuristDigestaBooks books={books} author_id={author_id}/>}

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
