import DigestaTocMobileBook from "../DigestaTocMobileBook/DigestaTocMobileBook";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import {useNavigate} from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";
import {useState} from "react";
import DigestaTocDesktopJuristDigestaBook
    from "../../DigestaTocDesktop/DigestaTocDesktopJuristDigestaBook/DigestaTocDesktopJuristDigestaBook";
import DigestaTocMobileJuristDigestaBook from "../DigestaTocMobielJuristDigestaBook/DigestaTocMobileJuristDigestaBook";

const DigestaTocMobileJuristDigestaBooks = ({books, author_id}) => {
    const [book_id, setBookId] = useState(false)
    // const url = props.url
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const chosenBookId = useSelector(state => state.digesta.chosenBookId)
    // const toc = props.toc
    const onOptionChangeHandler = (event) => {
        // dispatch(digestaActions.setChosenBookId(parseInt(event.target.value)))
        // navigate(author_id)
        const book_id = event.target.value
        setBookId(book_id)
    }
    //
    return (
        <>

            <TocMobile onOption={onOptionChangeHandler}>
                <option value={''}>Wybierz księgę</option>
                {books.map(book => (<option key={book.id} value={book.id}>{book.book_latin_name}</option>))}
                })}
            </TocMobile>

            {book_id ? <DigestaTocMobileJuristDigestaBook book_id={book_id} author_id={author_id}/> : false}

            {/*</div>*/}
        </>
    )
}

export default DigestaTocMobileJuristDigestaBooks