import DigestaTocDesktopBook from "../DigestaTocDesktopBook/DigestaTocDesktopBook"
import classes from "./DigestaTocDesktopJuristDigestaBooks.module.css"
import DigestaTocDesktopJuristDigestaBook
    from "../DigestaTocDesktopJuristDigestaBook/DigestaTocDesktopJuristDigestaBook";

const DigestaTocDesktopJuristDigestaBooks = ({books, author_id}) => {
    const sortedBooks = [...books]
    sortedBooks.sort((a, b) => {return a.book_nr - b.book_nr})
    // console.log(author_id, "ID", books)
    return (
        <div className={classes.main_toc}>
            <h4 className={classes.main_toc__title}>Digesta Iustiniani</h4>
            <ul className={classes.main_toc__items}>

                {books.map((book) => {
                    return <DigestaTocDesktopJuristDigestaBook key={book.id} book={book} author_id={author_id}/>

                })}
            </ul>

        </div>

    )
}

export default DigestaTocDesktopJuristDigestaBooks