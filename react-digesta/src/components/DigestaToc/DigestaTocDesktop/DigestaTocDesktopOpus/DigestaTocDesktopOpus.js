import {useState} from "react";
import DigestaTocDesktopOpusLiber from "../DigestaTocDesktopOpusLiber/DigestaTocDesktopOpusLiber";
import classes from "./DigestaTocDesktopOpus.module.css"

const DigestaTocDesktopOpus = ({opus}) => {
    const [menuLibriOpen, setMenuLibriOpen] = useState(false)
    const openOpusHandler = () => {
        setMenuLibriOpen((current) => !current)
    }

    return (
        <li className={classes.main_toc__item}>
            <button className={classes.main_toc__opus} onClick={openOpusHandler}>
                <p>{opus.title_lat}</p><p>{opus.author.name}</p>
            </button>

            {menuLibriOpen && <div className={classes.main_toc__libri_items}>
                <div>&nbsp;</div>
                <ul>
                    {opus.libri.map((liber) => (<DigestaTocDesktopOpusLiber liber={liber}/>))}
                </ul>

            </div>}

        </li>
    )
}

export default DigestaTocDesktopOpus