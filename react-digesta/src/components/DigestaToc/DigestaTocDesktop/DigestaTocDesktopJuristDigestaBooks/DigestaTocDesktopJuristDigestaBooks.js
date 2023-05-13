import classes from "./DigestaTocDesktopJuristDigestaBooks.module.css"
import DigestaTocDesktopJuristDigestaBook
    from "../DigestaTocDesktopJuristDigestaBook/DigestaTocDesktopJuristDigestaBook";
// import classes from "../../../UI/styling/DigestaDesktopBooks/DigestaDesktopBooks.module.css"
const DigestaTocDesktopJuristDigestaBooks = ({books, author_id}) => {
    const sortedBooks = [...books]
    sortedBooks.sort((a, b) => {
        return a.book_nr - b.book_nr
    })
    return (
        <div className={classes.main_toc}>
            <h4 className={classes.main_toc__title}>Digesta Iustiniani</h4>
            <ul className={classes.main_toc__items}>

                {sortedBooks.map((book) => {
                    return <DigestaTocDesktopJuristDigestaBook key={book.id} book={book} author_id={author_id}/>

                })}
            </ul>

        </div>

    )
}

export default DigestaTocDesktopJuristDigestaBooks