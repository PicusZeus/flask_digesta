import classes from "./DigestaTocMobileOpus.module.css"
import {useNavigate} from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";
import {useState} from "react";

const DigestaTocMobileOpus = ({opus}) => {
    const [chosenBook, setChosenBook] = useState(false)
    const navigate = useNavigate()
    const onChoseBookHandler = (event) => {
        const liber_id = event.target.value
        const liber = opus.libri.filter((liber)=>{
            return (liber.id===parseInt(liber_id))})[0]
            setChosenBook(liber)
    }
    const onChoseLexHandler = event => {
        const lex_id = event.target.value
        navigate(lex_id.toString())
    }
// }

    const libri = opus.libri
    return (
        <>

        <TocMobile onOption={onChoseBookHandler}>
            <option value={''}>Wybierz księgę</option>

            {libri && libri.map(liber => (
                <option key={liber.id} value={liber.id}>
                    Księga {liber.liber}
                </option>))}
        </TocMobile>

            {chosenBook && <TocMobile onOption={onChoseLexHandler}>
                <option value="">Wybierz fragment</option>
                {chosenBook.leges.map(lex=>(
                <option key={lex.id} value={lex.id}>
                    D.{lex.titulus.book.book_nr}.{lex.titulus.number}.{lex.lex_nr}
                </option>))}
            </TocMobile> }






</>

)
}

export default DigestaTocMobileOpus