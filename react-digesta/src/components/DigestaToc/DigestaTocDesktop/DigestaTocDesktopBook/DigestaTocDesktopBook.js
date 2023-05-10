import {useState} from "react";
import DigestaTocDesktopTitulus from "../DigestaTocDesktopTitulus/DigestaTocDesktopTitulus";
import classes from "./DigestaTocDesktopBook.module.css"
import {useLocation} from "react-router-dom";

const DigestaTocDesktopBook = ({book}) => {
    const [bookMenuOpen, setBookMenuOpen] = useState(false)
    const [tituli, setTituli] = useState(book.tituli)
    console.log(book.tituli, "TITULI")
    // the url only for jurists, as tituli are already set if otherwise
    const urlLoadTituli = process.env.REACT_APP_BASE_API_URL + `digesta/tituli/${book.id}`
    const loadTituli = () => {
        const sendRequest = async () => {
            const response = await fetch(urlLoadTituli)
            if (!response.ok) {
                throw new Error()
            }
            return await response.json()
        }
        sendRequest().then((response)=>{
            console.log(response, urlLoadTituli)
            setTituli(response)
        }).catch((e)=>(console.log(e)))
    }

    const openTituliHandler = () => {
        console.log('TITULI OPEN', !bookMenuOpen)
        setBookMenuOpen((current)=>!current)
        if (!bookMenuOpen && !tituli) {
            console.log('loading')
            // loadTituli()
        }
    }

    return (
        <li>
            <button className={classes.main_toc__book}
                    onClick={openTituliHandler}>Księga {book.book_nr} ({book.book_latin_name})
            </button>
            {bookMenuOpen && <div className={classes.main_toc__tituli}>
                <div>&nbsp;</div>
                <ul className={classes.main_toc__tituli_items}>
                    {book.tituli.map((titulus) => (<DigestaTocDesktopTitulus key={titulus.id} titulus={titulus}/>))}
                    {/*{book.tituli.map(titulus => <h1>titulus</h1>)}*/}
                </ul>
            </div>}
        </li>
    )
}

export default DigestaTocDesktopBook