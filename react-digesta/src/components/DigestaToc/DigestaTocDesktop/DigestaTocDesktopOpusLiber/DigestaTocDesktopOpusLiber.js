import {useState} from "react";
import {Link} from "react-router-dom";
import classes from "./DigestaTocDesktopOpusLiber.module.css"
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";

const DigestaTocDesktopOpusLiber = ({liber, libriLength, lexPath}) => {
    const [openLegesMenu, setOpenLegesMenu] = useState(false)
    const [leges, setLeges] = useState(false)
    // console.log(lexPath, 'p')
    const liberLineClasses = [classes.liber__line]
    const urlLoadLeges = process.env.REACT_APP_BASE_API_URL + `digesta/opus/leges/${liber.id}`
    const loadLeges = () => {
        const sendRequest = async () => {
            const response = await fetch(urlLoadLeges)
            if (!response.ok) {
                throw new Error()
            }
            return await response.json()
        }
        sendRequest().then((response)=>{
            setLeges(response)
        }).catch(e=>(console.log(e)))

    }

    const openLiberHandler = () => {
        setOpenLegesMenu((current)=>!current)
        if (!openLegesMenu && !leges) {
            loadLeges()
        }
    }
    console.log(leges, "OPUS")


    if (libriLength === 1) {
        liberLineClasses.push(classes.liber__line_single)
    }

    return (
        <li className={classes.liber_main}>
            <div className={liberLineClasses.join(" ")}>&nbsp;</div>

            <div className={classes.liber_group}>
                <div>&nbsp;</div>
                <button onClick={openLiberHandler}>
                    Księga {liber.liber}
                </button>


            </div>
            {openLegesMenu && leges && <div className={classes.liber__leges_group}>
                <div>&nbsp;</div>

                <ul>
                    {leges.map(lex => {
                        // <li key={lex.id} className={classes.liber__lex_group}>
                        //     <span>&nbsp;</span>
                        //     {/*<div>{lex.id.toString()}</div>*/}
                        //     {/*<Link className={classes.liber__lex_link} to={lexPath + lex.id.toString()}>*/}
                        //     {/*    D.{lex.titulus.book.book_nr}.{lex.titulus.number}.{lex.lex_nr}*/}
                        //     {/*</Link>*/}
                        //
                        // </li>)
                        const address = `D.${lex.titulus.book.book_nr}.${lex.titulus.number}.${lex.lex_nr}`
                            return ( < DigestaTocDesktopLex
                        address = {address}
                        key = {lex.id}
                        path = {lexPath}
                        lex = {lex}
                        legesLength = {leges.length}
                        />)
                    })}
                </ul>
            </div>}
        </li>
    )
}

export default DigestaTocDesktopOpusLiber