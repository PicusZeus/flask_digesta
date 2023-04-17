import {json, Outlet, useLoaderData} from "react-router-dom";
import DigestaTocBooks from "../../../components/DigestaToc/DigestaTocBooks/DigestaTocBooks";


const DigestaJuristDigesta = () => {
    const toc = useLoaderData()

    return (
        <>
            <div>Jurysta wg układu digesta</div>
            <DigestaTocBooks toc={toc}/>
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
    const response = await fetch("http://127.0.0.1:5001/digesta/books");

    if (!response.ok) {
        throw json(
            {message: 'could not load'},
            {status: 500}
        )

    } else {
        const data = await response.json()


        return prepareToc(id, data)

    }
}