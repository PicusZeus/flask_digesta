import {NavLink} from "react-router-dom";
import classes from "./DigestaTocDesktopLex.module.css"

const DigestaTocDesktopLex = ({lex}) => {

    const paragraphi = [...lex.paragraphi]
    paragraphi.pop()


    return (
        <li>
            <div className={classes.lex_group}>
                <div>&nbsp;</div>
                <NavLink to={lex.id.toString()}>Ustawa {lex.lex_nr}</NavLink>

            </div>
            <div className={classes.paragraphi_group}>
                <div>&nbsp;</div>
                <ul>
                    {paragraphi.length > 0 && paragraphi.map((p) => (
                        <li className={classes.paragraphus_group} key={p.id}>
                            <div>&nbsp;</div>
                            <NavLink to={lex.id.toString() + '/' + p.id}>{p.key}</NavLink>
                        </li>))}
                </ul>

            </div>


        </li>
    )
}

export default DigestaTocDesktopLex