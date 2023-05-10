import {useState} from "react";
import classes from "./DigestaTocDesktopOpusLiber.module.css"
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import {useDispatch} from "react-redux";
import NotificationService from "../../../../services/notification.service";

const DigestaTocDesktopOpusLiber = ({liber, libriLength, lexPath}) => {
    const [openLegesMenu, setOpenLegesMenu] = useState(false)
    const [leges, setLeges] = useState(false)
    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)
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
        sendRequest().then((response) => {
            setLeges(response)
        }).catch(e => (
            notificationSetter.setNotificationError("Błąd ładowanie", "Błąd serwera")
        ))

    }

    const openLiberHandler = () => {
        setOpenLegesMenu((current) => !current)
        if (!openLegesMenu && !leges) {
            loadLeges()
        }
    }


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
                        const address = `D.${lex.titulus.book.book_nr}.${lex.titulus.number}.${lex.lex_nr}`
                        return (< DigestaTocDesktopLex
                            address={address}
                            key={lex.id}
                            path={lexPath}
                            lex={lex}
                            legesLength={leges.length}
                        />)
                    })}
                </ul>
            </div>}
        </li>
    )
}

export default DigestaTocDesktopOpusLiber