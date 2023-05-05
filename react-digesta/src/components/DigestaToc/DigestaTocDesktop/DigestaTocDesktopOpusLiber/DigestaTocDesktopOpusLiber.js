import {useState} from "react";
import {Link} from "react-router-dom";
import classes from "./DigestaTocDesktopOpusLiber.module.css"

const DigestaTocDesktopOpusLiber = ({liber, libriLength}) => {
    const [openLegesMenu, setOpenLegesMenu] = useState(false)


    const liberLineClasses = [classes.liber__line]
    if (libriLength === 1) {
        liberLineClasses.push(classes.liber__line_single)
    }

    return (
        <li className={classes.liber_main}>
            <div className={liberLineClasses.join(" ")}>&nbsp;</div>

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
                        <li key={lex.id} className={classes.liber__lex_group}>
                            <span>&nbsp;</span>

                            <Link className={classes.liber__lex_link} to={lex.id.toString()}>
                                D.{lex.titulus.book.book_nr}.{lex.titulus.number}.{lex.lex_nr}
                            </Link>
                        </li>))}
                </ul>
            </div>}
        </li>
    )
}

export default DigestaTocDesktopOpusLiber