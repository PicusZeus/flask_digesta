import {json, Outlet, useLoaderData, useLocation, useParams} from "react-router-dom";
import DigestaTocMobileBooks from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileBooks/DigestaTocMobileBooks";
import classes from './DigestaJuristDigesta.module.css'
import DigestaTocDesktopBooks
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopBooks/DigestaTocDesktopBooks";
import DigestaTocDesktopJuristDigestaBooks
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopJuristDigestaBooks/DigestaTocDesktopJuristDigestaBooks";
import DigestaTocMobileJuristDigestaBooks
    from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileJuristDigestaBooks/DigestaTocMobileJuristDigestaBooks";
const DigestaJuristDigesta = () => {
    // const books = []
    const books = useLoaderData()
    const params = useParams()
    const author_id = params.jurysta_id
    // const author_id = 1
    // console.log(author_id, 'DIG')
    return (
        <div className={classes.toc_container}>
            {/*<h1 className={classes.main_title}>Według układu Digestów</h1>*/}
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




export const loader = async ({params, request}) => {
    const id = parseInt(params.jurysta_id);

    const response = await fetch( process.env.REACT_APP_BASE_API_URL + "digesta/books/author/" + id);

    if (!response.ok) {
        throw json(
            {message: 'Nie udało się załadować spisu ustaw jurysty'},
            {status: 500}
        )

    } else {
        const data = await response.json()

        return data
        // return prepareToc(id, data)

    }
}