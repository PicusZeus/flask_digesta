import {useState} from "react";
import DigestaTocDesktopOpusLiber from "../DigestaTocDesktopOpusLiber/DigestaTocDesktopOpusLiber";
import classes from "./DigestaTocDesktopOpus.module.css"
import {useDispatch, useSelector} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";

const DigestaTocDesktopOpus = ({opus, lexPath}) => {
    const chosenOpusId = useSelector(state => state.digesta.chosenOpusId)
    const [menuLibriOpen, setMenuLibriOpen] = useState(chosenOpusId === opus.id)
    // const ref = useRef(null)
    const dispatch = useDispatch()


    const openOpusHandler = () => {
        if (!menuLibriOpen) {
            dispatch(digestaActions.setChosenOpusId(opus.id))
            dispatch(digestaActions.setChosenOpusLiberId(null))
        }
        setMenuLibriOpen((current) => !current)
    }
    const libriLength = opus.libri.length

    const singleBook = opus.libri.length === 1 && opus.libri[0].liber === "0"
    return (
        <li>
            <button className={classes.main_toc__opus} onClick={openOpusHandler}>
                <p>{!singleBook ? "Libri" : "Liber"} {opus.title_lat}</p><p>{opus.author.name}</p>
            </button>

            {menuLibriOpen && <div className={classes.main_toc__libri}>
                <ul className={classes.main_toc__libri_items}>
                    {opus.libri.map((liber) => (
                        <DigestaTocDesktopOpusLiber key={liber.id} liber={liber} libriLength={libriLength}
                                                    lexPath={lexPath}/>))}
                </ul>

            </div>}

        </li>
    )
}

export default DigestaTocDesktopOpus