import classes from "./DigestaTocDesktopJuristDigestaTitulus.module.css"
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NotificationService from "../../../../services/notification.service";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import {digestaActions} from "../../../../store/digesta-slice";
import {useQuery} from "@tanstack/react-query";
import {getLegesAuthor} from "../../../../api/api";

const DigestaTocDesktopJuristDigestaTitulus = ({titulus, author_id}) => {
    const chosenTitulusId = useSelector(state => state.digesta.chosenTitulusId)
    const ref = useRef(null)
    const [titulusMenuOpen, setTitulusMenuOpen] = useState(chosenTitulusId === titulus.id)

    useEffect(()=>{
        if (chosenTitulusId === titulus.id) {
            ref.current.scrollIntoView({behavior: "smooth", block: "start"})
        }
    })
    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)


    const {data: leges} = useQuery({
        queryKey: ["digesta", "titulus", "leges", "author", titulus.id, author_id],
        queryFn: () => getLegesAuthor(titulus.id, author_id),
        onError: () => notificationSetter.setNotificationError('Błąd sieci', 'Nie udało się załadować spisu ustaw w tytule')

    })


    const openTitulusHandler = () => {
        setTitulusMenuOpen((current) => !current)
        if (!titulusMenuOpen) {
            dispatch(digestaActions.setChosenTitulusId(titulus.id))
        }
    }
    const path = `/jurysci/digesta/${author_id}/`

    return (

        <li ref={ref} className={classes.titulus_main}>
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
                        <DigestaTocDesktopLex  key={lex.id} path={path} lex={lex} legesLength={leges.length}/>))}
                </ul>

            </div>}
        </li>
    )
}

export default DigestaTocDesktopJuristDigestaTitulus

