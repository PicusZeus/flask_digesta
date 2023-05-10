import TocMobile from "../../../UI/TocMobile/TocMobile";
import {useState} from "react";
import DigestaTocMobileJuristDigestaBook from "../DigestaTocMobielJuristDigestaBook/DigestaTocMobileJuristDigestaBook";

const DigestaTocMobileJuristDigestaBooks = ({books, author_id}) => {
    const [book_id, setBookId] = useState(false)

    const onOptionChangeHandler = (event) => {
        const book_id = event.target.value
        setBookId(book_id)
    }
    return (
        <>

            <TocMobile onOption={onOptionChangeHandler}>
                <option value={''}>Wybierz księgę</option>
                {books.map(book => (<option key={book.id} value={book.id}>{book.book_latin_name}</option>))}
                })}
            </TocMobile>

            {book_id ? <DigestaTocMobileJuristDigestaBook book_id={book_id} author_id={author_id}/> : false}

        </>
    )
}

export default DigestaTocMobileJuristDigestaBooks