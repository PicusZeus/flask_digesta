import classes from "./DigestaTocDesktopJuristDigestaTitulus.module.css"
import {useState} from "react";
import {useDispatch} from "react-redux";
import NotificationService from "../../../../services/notification.service";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";


const DigestaTocDesktopJuristDigestaTitulus = ({titulus, author_id}) => {
    const [titulusMenuOpen, setTitulusMenuOpen] = useState(false)

    const [leges, setLeges] = useState([])

    const dispatch = useDispatch()


    const legesLoader = () => {
        const notificationSetter = new NotificationService(dispatch)

        const urlLoadLegesData = process.env.REACT_APP_BASE_API_URL + `digesta/titulus/leges/author/${titulus.id}/${author_id}`

        const sendRequest = async () => {
            const response = await fetch(urlLoadLegesData)
            return await response.json()

        }
        sendRequest().then((response) => {


            setLeges(response)
        }).catch((e) => {
            notificationSetter.setNotificationError('Ładowanie tytułu', 'Błąd Servera')
        })
    }

    const openTitulusHandler = () => {
        setTitulusMenuOpen((current) => !current)
        if (!titulusMenuOpen && leges.length === 0) {

            legesLoader()
        }
    }
    const path = `/jurysci/digesta/${author_id}/`

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
                        <DigestaTocDesktopLex key={lex.id} path={path} lex={lex} legesLength={leges.length}/>))}
                </ul>

            </div>}
        </li>
    )
}

export default DigestaTocDesktopJuristDigestaTitulus

