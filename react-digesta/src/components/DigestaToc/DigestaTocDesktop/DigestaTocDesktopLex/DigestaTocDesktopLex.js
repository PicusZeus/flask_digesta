import {NavLink, useParams} from "react-router-dom";
import classes from "./DigestaTocDesktopLex.module.css"

const DigestaTocDesktopLex = ({address, lex, legesLength, path}) => {

    const paragraphi = [...lex.paragraphi]
    const comp = (a, b) => { return parseInt(a.key) - parseInt(b.key) }
    paragraphi.sort(comp)
    paragraphi.pop()
    // const params = useParams()
    const lexUrl = `${path}${lex.id}`
    // console.log(params, lex.id)
    const tocLineClasses = [classes.lex__line]
    if (legesLength === 1) {
        tocLineClasses.push(classes.lex__line_single_lex)
    }
    const lexAddress = address ? address : "Ustawa " + lex.lex_nr
    return (
        <li className={classes.lex_main}>
           <div className={tocLineClasses.join(" ")}>&nbsp;</div>
            <div className={classes.lex_group}>
                <div>&nbsp;</div>
                <NavLink to={lexUrl}>{lexAddress}</NavLink>

            </div>
            <div className={classes.paragraphi_group}>
                <div>&nbsp;</div>
                <ul>
                    {paragraphi.length > 0 && paragraphi.map((p) => (
                        <li className={classes.paragraphus_group} key={p.id}>
                            <span>&nbsp;</span>
                            <NavLink to={lexUrl + '/' + p.id}>{p.key}</NavLink>
                        </li>))}
                </ul>

            </div>


        </li>
    )
}

export default DigestaTocDesktopLex