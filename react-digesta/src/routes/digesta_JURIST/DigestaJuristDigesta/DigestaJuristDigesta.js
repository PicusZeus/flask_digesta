import {json, Outlet, useLoaderData, useLocation} from "react-router-dom";
import DigestaTocMobileBooks from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileBooks/DigestaTocMobileBooks";
import classes from './DigestaJuristDigesta.module.css'
import DigestaTocDesktopBooks
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopBooks/DigestaTocDesktopBooks";

const DigestaJuristDigesta = () => {
    const books = useLoaderData()
    const location = useLocation()
    return (
        <div className={classes.toc_container}>
            {/*<h1 className={classes.main_title}>Według układu Digestów</h1>*/}
            <div className={classes.mobile_toc}>
                <DigestaTocMobileBooks toc={books} url={location}/>

            </div>
            <div className={classes.desktop_toc}>
                <DigestaTocDesktopBooks books={books}/>

            </div>

            <div className={classes.toc_outlet}>
                <Outlet/>
            </div>

        </div>
    )
}

export default DigestaJuristDigesta


const prepareToc = (id, books) => {
    const _id = parseInt(id)
    const newBooks = []

    for (const book of books) {

        const newBook = {...book, 'tituli': []}
        for (const titulus of book.tituli) {
            const newTitulus = {...titulus, leges: []}
            const newLeges = titulus.leges.filter((lex) => {

                return (lex.author_id === _id)
            })
            if (newLeges.length > 0) {
                newTitulus.leges = newLeges
                newBook.tituli.push(newTitulus)
            }
        }
        if (newBook.tituli.length > 0) {
            newBooks.push(newBook)
        }

    }
    return newBooks
}


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