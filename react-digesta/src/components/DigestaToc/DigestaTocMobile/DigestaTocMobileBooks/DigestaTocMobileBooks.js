import DigestaTocMobileBook from "../DigestaTocMobileBook/DigestaTocMobileBook";
import classes from "./DigestaTocMobileBooks.module.css"
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import {useNavigate} from "react-router-dom";

const DigestaTocMobileBooks = (props) => {
    const url = props.url
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const chosenBookId = useSelector(state => state.digesta.chosenBookId)
    const toc = props.toc
    const onOptionChangeHandler = (event) => {
        dispatch(digestaActions.setChosenBookId(parseInt(event.target.value)))
        navigate(url)
    }
    //
    return (
        <>



                <label className={classes.main_toc__label}>Wybierz księgę</label>

                <select className={classes.main_toc__book_option} onChange={onOptionChangeHandler}>
                    <option value={''}>Wybierz księgę</option>
                    {toc && toc.map(book => (<option key={book.id} value={book.id}>{book.book_latin_name}</option>))}
                    })}
                </select>
                {chosenBookId && <DigestaTocMobileBook url={url} tituli={toc.filter((book) => {
                    return (book.id === chosenBookId)
                })[0].tituli}/>}


        </>
    )
}

export default DigestaTocMobileBooks