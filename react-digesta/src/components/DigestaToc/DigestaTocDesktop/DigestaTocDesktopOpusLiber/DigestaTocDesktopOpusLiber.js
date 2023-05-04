import {useState} from "react";
import {Link} from "react-router-dom";
import classes from "./DigestaTocDesktopOpusLiber.module.css"
const DigestaTocDesktopOpusLiber = ({liber}) => {
    const [openLegesMenu, setOpenLegesMenu] = useState(false)


    return (
        <li>
            <div className={classes.liber_group}>
                <div>&nbsp;</div>
                <button onClick={() => setOpenLegesMenu((current) => !current)}>
                    Księga {liber.liber}
                </button>


            </div>
            {openLegesMenu && <div className={classes.liber__leges_group}>
                <div>&nbsp;</div>

                <ul>
                    {liber.leges.map(lex => (
                        <li key={lex.id}><Link
                            to={lex.id.toString()}>D.{lex.titulus.book.book_nr}.{lex.titulus.number}.{lex.lex_nr}</Link>
                        </li>))}
                </ul>
            </div>}
        </li>
    )
}

export default DigestaTocDesktopOpusLiber