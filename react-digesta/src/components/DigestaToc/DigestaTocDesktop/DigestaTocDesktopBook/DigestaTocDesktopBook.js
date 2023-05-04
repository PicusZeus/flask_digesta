import {useState} from "react";
import DigestaTocDesktopTitulus from "../DigestaTocDesktopTitulus/DigestaTocDesktopTitulus";
import classes from "./DigestaTocDesktopBook.module.css"

const DigestaTocDesktopBook = ({book}) => {
    const [bookMenuOpen, setBookMenuOpen] = useState(false)

    return (
        <li className={classes.main_toc__item}>
            <button className={classes.main_toc__book}
                    onClick={() => setBookMenuOpen(!bookMenuOpen)}>Księga {book.book_nr} ({book.book_latin_name})
            </button>
            <div className={classes.main_toc__tituli}>
                <div>&nbsp;</div>
                <ul className={classes.main_toc__tituli_items}>
                    {bookMenuOpen && <h4>Tytuły</h4>}
                    {bookMenuOpen && book.tituli.map((titulus) => (<DigestaTocDesktopTitulus titulus={titulus}/>))}
                </ul>
            </div>
        </li>
    )
}

export default DigestaTocDesktopBook