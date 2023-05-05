import {useState} from "react";
import DigestaTocDesktopTitulus from "../DigestaTocDesktopTitulus/DigestaTocDesktopTitulus";
import classes from "./DigestaTocDesktopBook.module.css"

const DigestaTocDesktopBook = ({book}) => {
    const [bookMenuOpen, setBookMenuOpen] = useState(false)

    return (
        <li>
            <button className={classes.main_toc__book}
                    onClick={() => setBookMenuOpen(!bookMenuOpen)}>Księga {book.book_nr} ({book.book_latin_name})
            </button>
            {bookMenuOpen && <div className={classes.main_toc__tituli}>
                <div>&nbsp;</div>
                <ul className={classes.main_toc__tituli_items}>
                    {book.tituli.map((titulus) => (<DigestaTocDesktopTitulus titulus={titulus}/>))}
                </ul>
            </div>}
        </li>
    )
}

export default DigestaTocDesktopBook