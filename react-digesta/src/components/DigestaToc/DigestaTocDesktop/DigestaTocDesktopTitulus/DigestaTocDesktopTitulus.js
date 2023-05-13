import {useState} from "react";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import classes from './DigestaTocDesktopTitulus.module.css'
import NotificationService from "../../../../services/notification.service";
import {useDispatch} from "react-redux";
import api from "../../../../api/api";
import {useQuery} from "@tanstack/react-query";

const DigestaTocDesktopTitulus = ({titulus}) => {

    const [titulusMenuOpen, setTitulusMenuOpen] = useState(false)

    const dispatch = useDispatch()

    const notificationSetter = new NotificationService(dispatch)
    const getLeges = (id) => {

        return api.get("digesta/titulus/leges/" + id).then((response) => {
            return response.data
        }).catch(() => {
                notificationSetter.setNotificationError('Ładowanie tytułu', 'Błąd Servera')

            }
        )

    }

    const {data: leges} = useQuery({
            queryKey: ["digesta", "titulus", "leges", titulus.id],
            queryFn: () => getLeges(titulus.id)
        }
    )

    const openTitulusHandler = () => {
        setTitulusMenuOpen((current) => !current)

    }

    return (
        <li className={classes.titulus_main}>
            <div className={classes.titulus__line}>&nbsp;</div>
            <div className={classes.titulus_group}>
                <div>&nbsp;</div>
                <button onClick={openTitulusHandler}>
                    <p>Tytuł {titulus.number}</p>
                    <p>{titulus.title_pl}</p>
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