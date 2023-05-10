import {useEffect, useState} from "react";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import classes from './DigestaTocDesktopTitulus.module.css'
import NotificationService from "../../../../services/notification.service";
import {useDispatch} from "react-redux";

const DigestaTocDesktopTitulus = ({titulus}) => {

    const [titulusMenuOpen, setTitulusMenuOpen] = useState(false)
    //
    const [leges, setLeges] = useState([])
    //
    const dispatch = useDispatch()
    // console.log('TITULUS', leges)

    // let urlLoadLegesData = process.env.REACT_APP_BASE_API_URL + `digesta/titulus/leges/${titulus.id}`
    // let leges = []
    const notificationSetter = new NotificationService(dispatch)
    const legesLoader =() => {


        const urlLoadLegesData = process.env.REACT_APP_BASE_API_URL + `digesta/titulus/leges/${titulus.id}`

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