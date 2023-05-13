import classes from "./DigestaTocDesktopJuristDigestaTitulus.module.css"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NotificationService from "../../../../services/notification.service";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
// import classes from "../../../UI/styling/DigestaDesktopTitulus/DigestaDesktopTitulus.module.css"
import {digestaActions} from "../../../../store/digesta-slice";
import api from "../../../../api/api";
import {useQuery} from "@tanstack/react-query";
const DigestaTocDesktopJuristDigestaTitulus = ({titulus, author_id}) => {
    const [titulusMenuOpen, setTitulusMenuOpen] = useState(false)


    const dispatch = useDispatch()
        const notificationSetter = new NotificationService(dispatch)

    const chosenTitulusId = useSelector(state=>state.digesta.chosenTitulusId)
    const getLeges = (titulusId, authorId) => {
        return api.get(`digesta/titulus/leges/author/${titulusId}/${authorId}`).then(response=>{
            return response.data
        }).catch(()=>{
            notificationSetter.setNotificationError('Błąd sieci', 'Nie udało się załadować spisu ustaw w tytule')

        })

    }

    const { data: leges } = useQuery({
        queryKey: ["digesta", "titulus", "leges", "author", titulus.id, author_id],
        queryFn: () => getLeges(titulus.id, author_id)
    })

    useEffect(()=>{
        if (titulus.id === chosenTitulusId) {
            setTitulusMenuOpen(true)
        }
    }, [])

    const openTitulusHandler = () => {
        setTitulusMenuOpen((current) => !current)
        if (!titulusMenuOpen) {
            dispatch(digestaActions.setChosenTitulusId(titulus.id))
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

