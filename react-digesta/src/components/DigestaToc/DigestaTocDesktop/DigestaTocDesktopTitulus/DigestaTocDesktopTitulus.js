import {useState} from "react";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import classes from './DigestaTocDesktopTitulus.module.css'

const DigestaTocDesktopTitulus = ({titulus}) => {
    const [titulusMenuOpen, setTitulusMenuOpen] = useState(false)
    const legesLength = titulus.leges.length
    return (
        <li className={classes.titulus_main}>
            <div className={classes.titulus__line}>&nbsp;</div>

            <div className={classes.titulus_group}>
                <div>&nbsp;</div>
                <button onClick={() => setTitulusMenuOpen((current) => !current)}>
                    <p>Tytuł {titulus.number}</p>
                    <p>{titulus.title_pl}</p>
                    <p>{titulus.title_lat}</p>
                </button>

            </div>
            {titulusMenuOpen && <div className={classes.titulus__leges_group}>
                <ul>
                    {titulus.leges.map((lex) => (
                        <DigestaTocDesktopLex key={titulus.id} lex={lex} legesLength={legesLength}/>))}
                </ul>

            </div>}
        </li>
    )
}

export default DigestaTocDesktopTitulus