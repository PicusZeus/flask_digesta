import {useState} from "react";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import classes from './DigestaTocDesktopTitulus.module.css'
import NotificationService from "../../../../services/notification.service";
import {useDispatch} from "react-redux";
const DigestaTocDesktopTitulus = ({titulus, author_id}) => {
    const [titulusMenuOpen, setTitulusMenuOpen] = useState(false)

    const [leges, setLeges] = useState(false)

    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)

    const openTitulusHandler = () => {
        setTitulusMenuOpen((current)=>!current)
        if (!titulusMenuOpen && !leges) {
            loadLegesData(titulus.id)
        }

    }

    let urlLoadLegesData = process.env.REACT_APP_BASE_API_URL + `digesta/titulus/leges/${titulus.id}`
    if (author_id) {
        urlLoadLegesData = process.env.REACT_APP_BASE_API_URL + `digesta/titulus/leges/author/${titulus.id}/${author_id}`
    }

    const loadLegesData = (titulus_id) => {
        const sendRequest = async () => {
            const response = await fetch(urlLoadLegesData)
            return await response.json()

        }
        sendRequest().then((response)=>{
            setLeges(response)
        }).catch((e)=>
            notificationSetter.setNotificationError('Ładowanie tytułu', 'Błąd Servera')
        )
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
                        <DigestaTocDesktopLex key={lex.id} lex={lex} legesLength={leges.length}/>))}
                </ul>

            </div>}
        </li>
    )
}

export default DigestaTocDesktopTitulus