import {useState} from "react";
import DigestaTocDesktopTitulus from "../DigestaTocDesktopTitulus/DigestaTocDesktopTitulus";
import classes from "./DigestaTocDesktopBook.module.css"
import {useLocation} from "react-router-dom";

const DigestaTocDesktopBook = ({book}) => {
    const [bookMenuOpen, setBookMenuOpen] = useState(false)
    const [tituli, setTituli] = useState(false)
    const location = useLocation()
    const author_id = location.pathname.split("/").slice(-1)

    const loadTituli = (author_id, book_id) => {
        const sendRequest = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + `digesta/tituli/author/${book_id}/${author_id}`)
            return await response.json()
        }
        sendRequest().then((response)=>{
            setTituli(response)
        }).catch((e)=>(console.log(e)))
    }

    const openTituliHandler = () => {
        setBookMenuOpen((current)=>!current)
        if (!bookMenuOpen && !tituli) {
            loadTituli(author_id, book.id)
        }
    }

    return (
        <li>
            <button className={classes.main_toc__book}
                    onClick={openTituliHandler}>Księga {book.book_nr} ({book.book_latin_name})
            </button>
            {bookMenuOpen && tituli && <div className={classes.main_toc__tituli}>
                <div>&nbsp;</div>
                <ul className={classes.main_toc__tituli_items}>
                    {tituli.map((titulus) => (<DigestaTocDesktopTitulus key={titulus.id} titulus={titulus} author_id={author_id}/>))}
                </ul>
            </div>}
        </li>
    )
}

export default DigestaTocDesktopBook