import {useState} from "react";
import DigestaTocDesktopTitulus from "../DigestaTocDesktopTitulus/DigestaTocDesktopTitulus";
import classes from "./DigestaTocDesktopBook.module.css"
const DigestaTocDesktopBook = ({book}) => {
    const [bookMenuOpen, setBookMenuOpen] = useState(false)
    const tituli = book.tituli


    const openTituliHandler = () => {
        setBookMenuOpen((current)=>!current)
        if (!bookMenuOpen && !tituli) {
        }
    }
    return (
        <li>
            <button className={classes.main_toc__book}
                    onClick={openTituliHandler}><span className={classes.bookCut}>{book.book_latin_name}</span>
            </button>
            {bookMenuOpen && <div className={classes.main_toc__tituli}>
                <div>&nbsp;</div>
                <ul className={classes.main_toc__tituli_items}>
                    {book.tituli.map((titulus) => (<DigestaTocDesktopTitulus key={titulus.id} titulus={titulus}/>))}
                </ul>
            </div>}
        </li>
    )
}

export default DigestaTocDesktopBook