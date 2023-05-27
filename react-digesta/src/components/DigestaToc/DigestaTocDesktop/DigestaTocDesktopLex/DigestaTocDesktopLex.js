import {NavLink} from "react-router-dom";
import classes from "./DigestaTocDesktopLex.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {digestaActions} from "../../../../store/digesta-slice";

const DigestaTocDesktopLex = ({address, lex, legesLength, path}) => {
    const chosenLexId = useSelector(state=>state.digesta.chosenLexId)
    const ref = useRef(null)
    const dispatch = useDispatch()
    const paragraphi = [...lex.paragraphi]
    const comp = (a, b) => { return parseInt(a.key) - parseInt(b.key) }
    paragraphi.sort(comp)
    paragraphi.pop()
    const lexUrl = `${path}${lex.id}`
    const tocLineClasses = [classes.lex__line]
    if (legesLength === 1) {
        tocLineClasses.push(classes.lex__line_single_lex)
    }
    useEffect(()=>{
        if (ref.current && chosenLexId === lex.id) {
            ref.current.scrollIntoView({behavior: "smooth", block: "start"})
        }
    },[lex.id, chosenLexId])

    const onClickHandler = () => {
        dispatch(digestaActions.setChosenLexId(lex.id))
    }
    const lexAddress = address ? address : "Lex " + lex.lex_nr
    return (
        <li ref={ref} className={classes.lex_main}>
           <div className={tocLineClasses.join(" ")}>&nbsp;</div>
            <div className={classes.lex_group}>
                <div>&nbsp;</div>
                <NavLink onClick={onClickHandler} to={lexUrl}>{lexAddress}</NavLink>

            </div>
            <div className={classes.paragraphi_group}>
                <div>&nbsp;</div>
                <ul>
                    {paragraphi.length > 0 && paragraphi.map((p) => (
                        <li className={classes.paragraphus_group} key={p.id}>
                            <span>&nbsp;</span>
                            <NavLink onClick={onClickHandler} to={lexUrl + '/' + p.id}>{p.key}</NavLink>
                        </li>))}
                </ul>

            </div>


        </li>
    )
}

export default DigestaTocDesktopLex