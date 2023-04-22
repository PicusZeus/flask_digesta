import classes from "../DigestaTocBook.module.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import DigestaTocLex from "./DigestaTocLex/DigestaTocLex";


const DigestaTocTitulus = (props) => {
    // const [chosenLex, setChosenLex] = useState(false)
    const navigate = useNavigate()
    const onOptionChangeHandler = (event) => {
        const lex_id = event.target.value
        // setChosenLex(parseInt(lex_id))
        navigate(lex_id.toString())

    }
    // console.log(props.leges, 'LEGES')
    // console.log(props.leges[0].paragraphi, 'lex')
    const leges = props.leges

    return (
        <>
            <label className={classes.main_toc__label}>Wybierz Ustawę</label>

            <select className={classes.main_toc__titulus_option} onChange={onOptionChangeHandler}>
                <option  value={null}>Wybierz ustawę</option>

                {leges && leges.map(lex => (<option key={lex.id} value={lex.id}>{lex.lex_nr}</option>))}
                })}
            </select>

            {/*{chosenLex && <DigestaTocLex paragraphi={leges.filter((lex) => {*/}
            {/*    return (lex.id === chosenLex)*/}
            {/*})[0]}/>}*/}
        </>
    )
}

export default DigestaTocTitulus