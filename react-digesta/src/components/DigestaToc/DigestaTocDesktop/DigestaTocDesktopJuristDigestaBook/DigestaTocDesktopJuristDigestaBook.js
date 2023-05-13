import classes from "./DigestaTocDesktopJuristDigestaBook.module.css"
import {useEffect, useState} from "react";
import DigestaTocDesktopJuristDigestaTitulus
    from "../DigestaTocDesktopJuristDigestaTitulus/DigestaTocDesktopJuristDigestaTitulus";
import {useDispatch, useSelector} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
// import classes from "../../../UI/styling/DigestaDesktopBook/DigestaDesktopBook.module.css"
const DigestaTocDesktopJuristDigestaBook = ({book, author_id}) => {

    const [bookMenuOpen, setBookMenuOpen] = useState(false)
    const [tituli, setTituli] = useState([])
    const dispatch = useDispatch()
    const chosenBookId = useSelector(state => state.digesta.chosenBookId)
    const loadTituli = () => {
           const urlLoadTituli = process.env.REACT_APP_BASE_API_URL + `digesta/tituli/author/${book.id}/${author_id}`
console.log('loading')
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
    // console.log('done')

    useEffect(() => {
        if (book.id === chosenBookId) {
            setBookMenuOpen(true)
            loadTituli()
        }
    }, [])

    const openTituliHandler = () => {
        if (!bookMenuOpen) {
            dispatch(digestaActions.setChosenBookId(book.id))
        }
        setBookMenuOpen((current)=>!current)
        if (!bookMenuOpen && tituli.length === 0) {
            loadTituli()}
    }

    return (
        <li>
            <button className={classes.main_toc__book}
                    onClick={openTituliHandler}><span className={classes.bookCut}>Księga {book.book_nr}</span>
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