import {useState} from "react";
import DigestaTocDesktopOpusLiber from "../DigestaTocDesktopOpusLiber/DigestaTocDesktopOpusLiber";
import classes from "./DigestaTocDesktopOpus.module.css"

const DigestaTocDesktopOpus = ({opus, lexPath}) => {
    const [menuLibriOpen, setMenuLibriOpen] = useState(false)
    const openOpusHandler = () => {
        setMenuLibriOpen((current) => !current)
    }
    const libriLength = opus.libri.length
    return (
        <li>
            <button className={classes.main_toc__opus} onClick={openOpusHandler}>
                <p>{opus.title_lat}</p><p>{opus.author.name}</p>
            </button>

            {menuLibriOpen && <div className={classes.main_toc__libri}>
                <ul className={classes.main_toc__libri_items}>
                    {opus.libri.map((liber) => (<DigestaTocDesktopOpusLiber key={liber.id} liber={liber} libriLength={libriLength} lexPath={lexPath}/>))}
                </ul>

            </div>}

        </li>
    )
}

export default DigestaTocDesktopOpus