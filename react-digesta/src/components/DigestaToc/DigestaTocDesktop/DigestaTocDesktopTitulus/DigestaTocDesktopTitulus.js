import {useState} from "react";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";


const DigestaTocDesktopTitulus = ({titulus}) => {
const [titulusMenuOpen, setTitulusMenuOpen] = useState(false)
console.log(titulus)

    return (
        <li>
            <button onClick={()=>setTitulusMenuOpen(!titulusMenuOpen)}>{titulus.title_lat}</button>
            {titulusMenuOpen && <h5>Ustawy</h5>}
            {titulusMenuOpen && titulus.leges.map((lex)=>(<DigestaTocDesktopLex lex={lex}/>))}

        </li>
    )
}

export default DigestaTocDesktopTitulus