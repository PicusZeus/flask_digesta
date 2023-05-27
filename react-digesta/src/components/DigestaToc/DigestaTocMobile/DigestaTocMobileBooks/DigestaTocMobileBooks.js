import DigestaTocMobileBook from "../DigestaTocMobileBook/DigestaTocMobileBook";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import {useNavigate} from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";

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
    const chosenBook = toc.filter(b=>b.id === chosenBookId).shift()
    return (
        <>

            <TocMobile onOption={onOptionChangeHandler}>
                <option value={''}>{chosenBook ? chosenBook.book_latin_name : "Wybierz księgę"}</option>
                {toc && toc.map(book => (<option key={book.id} value={book.id}>{book.book_latin_name}</option>))}
                })}
            </TocMobile>

            {chosenBook ? <DigestaTocMobileBook url={url} tituli={chosenBook.tituli}/> : false}
        </>
    )
}

export default DigestaTocMobileBooks