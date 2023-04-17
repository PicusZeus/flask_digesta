import DigestaTocBook from "./DigestaTocBook/DigestaTocBook";
import classes from "./DigestaTocBooks.module.css"
import {useState} from "react";

const DigestaTocBooks = (props) => {

    const [chosenBook, setChosenBook] = useState(null)
    const toc = props.toc
    const onOptionChangeHandler = (event) => {

        setChosenBook(parseInt(event.target.value))

    }


    return (
        <>
            <label className={classes.main_toc__label}>Wybierz księgę</label>

            <select className={classes.main_toc__book_option} onChange={onOptionChangeHandler}>
               <option key={666666} value={null}>Wybierz księgę</option>
                {toc && toc.map(book => (<option key={book.id} value={book.id}>{book.book_latin_name}</option>))}
                })}
            </select>
            {chosenBook && <DigestaTocBook content={toc.filter((book)=>{return (book.id===chosenBook)})[0]}/>}

        </>


    )
}

export default DigestaTocBooks