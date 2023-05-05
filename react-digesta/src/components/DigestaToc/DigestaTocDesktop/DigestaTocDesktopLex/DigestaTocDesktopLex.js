import {NavLink} from "react-router-dom";
import classes from "./DigestaTocDesktopLex.module.css"

const DigestaTocDesktopLex = ({lex, legesLength}) => {

    const paragraphi = [...lex.paragraphi]
    const comp = (a, b) => { return parseInt(a.key) - parseInt(b.key) }
    paragraphi.sort(comp)
    paragraphi.pop()

    const tocLineClasses = [classes.lex__line]
    if (legesLength === 1) {
        tocLineClasses.push(classes.lex__line_single_lex)
    }

    return (
        <li className={classes.lex_main}>
           <div className={tocLineClasses.join(" ")}>&nbsp;</div>
            <div className={classes.lex_group}>
                <div>&nbsp;</div>
                <NavLink to={lex.id.toString()}>Ustawa {lex.lex_nr}</NavLink>

            </div>
            <div className={classes.paragraphi_group}>
                <div>&nbsp;</div>
                <ul>
                    {paragraphi.length > 0 && paragraphi.map((p) => (
                        <li className={classes.paragraphus_group} key={p.id}>
                            <span>&nbsp;</span>
                            <NavLink to={lex.id.toString() + '/' + p.id}>{p.key}</NavLink>
                        </li>))}
                </ul>

            </div>


        </li>
    )
}

export default DigestaTocDesktopLex