import classes from "./DigestaTocMobileOpus.module.css"
import {useNavigate} from "react-router-dom";


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
            <div>{content.book} {content.title_lat} </div>

            <label className={classes.main_toc__label}>Wybierz fragment</label>

            <select className={classes.main_toc__opus_option} onChange={onOptionChangeHandler}>
                <option value={''}>Wybierz ustawę</option>

                {leges && leges.map(lex => (<option key={lex.id} value={lex.id}>D.{lex.titulus.book.numerus}.{lex.titulus.number}.{lex.lex_nr}</option>))}
                })}
            </select>

        </>

    )
}

export default DigestaTocMobileOpus