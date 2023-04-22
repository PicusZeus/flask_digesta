import classes from "../DigestaTocBook.module.css";
import {useDispatch} from "react-redux";
import {digestaActions} from "../../../../../store/digesta-slice";
import {Outlet, useNavigate} from "react-router-dom";

const DigestaTocTitulus = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onOptionChangeHandler = (event) => {
        dispatch(digestaActions.setChosenLexId(parseInt(event.target.value)))
        // if (chosenLexId) {
            navigate(event.target.value)
        // }

    }
    const leges = props.leges
    return (
        <>
            <label className={classes.main_toc__label}>Wybierz Ustawę</label>

            <select className={classes.main_toc__titulus_option} onChange={onOptionChangeHandler}>
                <option value={''}>Wybierz ustawę</option>

                {leges && leges.map(lex => (<option key={lex.id} value={lex.id}>{lex.lex_nr}</option>))}
                })}
            </select>
            <Outlet/>

        </>
    )
}

export default DigestaTocTitulus