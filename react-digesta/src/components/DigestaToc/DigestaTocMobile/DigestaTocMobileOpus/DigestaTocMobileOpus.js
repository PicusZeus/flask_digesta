import classes from "./DigestaTocMobileOpus.module.css"
import {useNavigate} from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";


const DigestaTocMobileOpus = (props) => {
    const navigate = useNavigate()
    const onOptionChangeHandler = (event) => {
        const lex_id = event.target.value
        navigate(lex_id.toString())
    }
    const content = props.content
    const leges = props.content.leges
    return (
        <>
        {/*<div>{content.book} {content.title_lat} </div>*/}

        {/*<label className={classes.main_toc__label}>Wybierz fragment</label>*/}
        <TocMobile onOption={onOptionChangeHandler}>
            <option value={''}>Wybierz fragment z Digestów</option>

            {leges && leges.map(lex => (
                <option key={lex.id}
                        value={lex.id}>D.{lex.titulus.book.numerus}.{lex.titulus.number}.{lex.lex_nr}
                </option>))}
        </TocMobile>




</>

)
}

export default DigestaTocMobileOpus