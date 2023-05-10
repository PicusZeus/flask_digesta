import classes from "./DigestaTocDesktopJuristDigestaBook.module.css"
import {useEffect, useState} from "react";
import DigestaTocDesktopTitulus from "../DigestaTocDesktopTitulus/DigestaTocDesktopTitulus";
import DigestaTocDesktopJuristDigestaTitulus
    from "../DigestaTocDesktopJuristDigestaTitulus/DigestaTocDesktopJuristDigestaTitulus";

const DigestaTocDesktopJuristDigestaBook = ({book, author_id}) => {

    const [bookMenuOpen, setBookMenuOpen] = useState(false)
    const [tituli, setTituli] = useState([])

    const urlLoadTituli = process.env.REACT_APP_BASE_API_URL + `digesta/tituli/author/${book.id}/${author_id}`
// console.log('JUIRIST Book', book, author_id, urlLoadTituli)


    const loadTituli = () => {
           const urlLoadTituli = process.env.REACT_APP_BASE_API_URL + `digesta/tituli/author/${book.id}/${author_id}`

        const sendRequest = async () => {
            const response = await fetch(urlLoadTituli)
            if (!response.ok) {
                throw new Error()
            }
            return await response.json()
        }
        sendRequest().then((response)=>{

            setTituli(response)
        }).catch((e)=>(console.log(e)))
    }

    const openTituliHandler = () => {

        setBookMenuOpen((current)=>!current)
        if (!bookMenuOpen && tituli.length === 0) {
            console.log('loading tituli', tituli)
            loadTituli()}
    }
    console.log(tituli, 'TITULI')

    return (
        <li>
            <button className={classes.main_toc__book}
                    onClick={openTituliHandler}>Księga {book.book_nr} ({book.book_latin_name})
            </button>
            {bookMenuOpen && <div className={classes.main_toc__tituli}>
                <div>&nbsp;</div>
                <ul className={classes.main_toc__tituli_items}>
                    {
                        tituli.map((titulus) => {
                            const pathApi = process.env.REACT_APP_BASE_API_URL + `digesta/titulus/leges/author/${titulus.id}/${author_id}`
                            return <DigestaTocDesktopJuristDigestaTitulus key={titulus.id} pathLex={`/jurysci/digesta/${author_id}/`} pathApi={pathApi} titulus={titulus} author_id={author_id}/>
                                })}
                </ul>
            </div>}
        </li>
    )
}

export default DigestaTocDesktopJuristDigestaBook