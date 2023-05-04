import {useState} from "react";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import classes from './DigestaTocDesktopTitulus.module.css'

const DigestaTocDesktopTitulus = ({titulus}) => {
const [titulusMenuOpen, setTitulusMenuOpen] = useState(false)
console.log(titulus)

    return (
        <li>
            <div className={classes.titulus_group}>
                <div>&nbsp;</div>
                <button onClick={() => setTitulusMenuOpen(!titulusMenuOpen)}>
                    <p>Tytuł {titulus.number}</p>
                    <p>{titulus.title_pl}</p>
                    <p>{titulus.title_lat}</p>
                </button>

            </div>
            {titulusMenuOpen && <div className={classes.titulus__leges_group}>
                <div>&nbsp;</div>
                <ul>
                    {titulus.leges.map((lex) => (
                        <DigestaTocDesktopLex key={titulus.id} lex={lex}/>))}

                </ul>

            </div>}


        </li>
    )
}

export default DigestaTocDesktopTitulus