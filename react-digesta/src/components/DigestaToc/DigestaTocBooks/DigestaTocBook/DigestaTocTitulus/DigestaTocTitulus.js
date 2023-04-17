import classes from "../DigestaTocBook.module.css";
import {useNavigate} from "react-router-dom";


const DigestaTocTitulus = (props) => {
    const navigate = useNavigate()
    const onOptionChangeHandler = (event) => {
        const lex_id = event.target.value
        navigate(lex_id.toString())

    }


    const leges = props.leges
    return (
        <>
            <label className={classes.main_toc__label}>Wybierz Tytuł</label>

            <select className={classes.main_toc__titulus_option} onChange={onOptionChangeHandler}>
                <option key={666666} value={null}>Wybierz ustawę</option>

                {leges && leges.map(lex => (<option key={lex.id} value={lex.id}>{lex.lex_nr}</option>))}
                })}
            </select>
        </>
    )
}

export default DigestaTocTitulus