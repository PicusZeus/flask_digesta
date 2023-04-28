import {NavLink} from "react-router-dom";


const DigestaTocDesktopLex = ({lex}) => {

    const paragraphi = [...lex.paragraphi]
    let pr = paragraphi.pop()



    console.log(lex)
    return (
        <li>
            <NavLink to={lex.id.toString()}>{lex.lex_nr }</NavLink>
            <ul>
                {paragraphi.length > 0 && paragraphi.map((p)=>(<li><NavLink to={lex.id.toString() + '/' + p.id}>par</NavLink></li>))}
            </ul>

        </li>
    )
}

export default DigestaTocDesktopLex