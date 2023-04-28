import {useState} from "react";
import {Link} from "react-router-dom";


const DigestaTocDesktopOpus = ({opus}) => {
const [menuOpusOpen, setMenuOpusOpen] = useState(false)
    console.log(opus)

    const leges = opus.leges.map((lex)=>(<li><Link to={lex.id.toString()}>D.{lex.titulus.book.book_nr}.{lex.titulus.number}.{lex.lex_nr}</Link></li>))

    return (
        <li>
            <button onClick={()=>setMenuOpusOpen(!menuOpusOpen)}>{opus.title_lat}</button>
            {menuOpusOpen && <h4>Fragmenty</h4>}
            {menuOpusOpen && <ul>{leges}</ul>}

        </li>
    )
}

export default DigestaTocDesktopOpus