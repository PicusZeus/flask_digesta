import {useState} from "react";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import classes from './DigestaTocDesktopTitulus.module.css'
import NotificationService from "../../../../services/notification.service";
import {useDispatch} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {getLeges} from "../../../../api/api";

const DigestaTocDesktopTitulus = ({titulus}) => {

    const [titulusMenuOpen, setTitulusMenuOpen] = useState(false)

    const dispatch = useDispatch()

    const notificationSetter = new NotificationService(dispatch)


    const {data: leges} = useQuery({
            queryKey: ["digesta", "titulus", "leges", titulus.id],
            queryFn: () => getLeges(titulus.id),
            onError: () => {
                notificationSetter.setNotificationError('Ładowanie tytułu', 'Błąd Servera')

            }
        }
    )

    const openTitulusHandler = () => {
        setTitulusMenuOpen((current) => !current)

    }
    console.log(titulus, "titulus")
    return (
        <li className={classes.titulus_main}>
            <div className={classes.titulus__line}>&nbsp;</div>
            <div className={classes.titulus_group}>
                <div>&nbsp;</div>
                <button onClick={openTitulusHandler}>
                    <p>Titulus {titulus.number}</p>
                    {/*<p>{titulus.title_pl}</p>*/}
                    <p>{titulus.title_lat}</p>
                </button>

            </div>
            {titulusMenuOpen && leges && <div className={classes.titulus__leges_group}>
                <ul>
                    {leges.map((lex) => (
                        <DigestaTocDesktopLex key={lex.id} path="/digesta/" lex={lex} legesLength={leges.length}/>))}
                </ul>

            </div>}
        </li>
    )

}

export default DigestaTocDesktopTitulus