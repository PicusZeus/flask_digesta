import DigestaTocDesktopBook from "../DigestaTocDesktopBook/DigestaTocDesktopBook";
import classes from "./DigestaTocDesktopBooks.module.css"
const DigestaTocDesktopBooks = ({books}) => {

    return (
        <div className={classes.main_toc}>
            <h4 className={classes.main_toc__title}>Digesta Iustiniani</h4>
            <ul className={classes.main_toc__items}>

                {books.map((book) =>
                    <DigestaTocDesktopBook key={book.id} book={book}/>

                )}
            </ul>

        </div>

    )
}

export default DigestaTocDesktopBooks