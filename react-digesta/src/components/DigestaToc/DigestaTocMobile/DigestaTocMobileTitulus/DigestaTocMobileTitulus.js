import classes from "../DigestaTocMobileBook/DigestaTocMobileBook.module.css";
import {useDispatch} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import {useNavigate} from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";

const DigestaTocMobileTitulus = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onOptionChangeHandler = (event) => {
        dispatch(digestaActions.setChosenLexId(parseInt(event.target.value)))
        navigate(event.target.value)


    }
    let leges = props.leges
    if (leges) {
        leges = props.leges.leges
    }
    return (
        <>


            <TocMobile onOption={onOptionChangeHandler}>

                <option value={''}>Wybierz ustawę</option>

                {leges && leges.map(lex => (<option key={lex.id} value={lex.id}>{lex.lex_nr}</option>))}

            </TocMobile>


        </>
    )
}

export default DigestaTocMobileTitulus