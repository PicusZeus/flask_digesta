import {json, Outlet, useLoaderData, useLocation} from "react-router-dom";
import DigestaTocBooks from "../../../../../components/DigestaToc/DigestaTocBooks/DigestaTocBooks";


const DigestaJuristDigesta = () => {
    const toc = useLoaderData()
    const location = useLocation()
    return (
        <>
            <div>Jurysta wg układu digesta</div>
            <DigestaTocBooks toc={toc} url={location}/>

            <Outlet/>
        </>
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
    const response = await fetch( process.env.REACT_APP_BASE_API_URL + "digesta/books");

    if (!response.ok) {
        throw json(
            {message: 'Nie udało się załadować spisu ustaw jurysty'},
            {status: 500}
        )

    } else {
        const data = await response.json()


        return prepareToc(id, data)

    }
}