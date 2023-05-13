import {useState} from "react";
import classes from "./DigestaTocDesktopOpusLiber.module.css"
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import {useDispatch} from "react-redux";
import NotificationService from "../../../../services/notification.service";
import api from "../../../../api/api";
import {useQuery} from "@tanstack/react-query";

const DigestaTocDesktopOpusLiber = ({liber, libriLength, lexPath}) => {
    const [openLegesMenu, setOpenLegesMenu] = useState(false)
    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)
    const liberLineClasses = [classes.liber__line]
    const getLeges = (id) => {
        return api.get("digesta/opus/leges/" + id).then(response => {
            return response.data
        }).catch(() => {
            notificationSetter.setNotificationError("Błąd połączenia", "Nie udało się załadować spisu ustaw")

        })
    }


    const { data: leges } = useQuery({
        queryKey: ["digesta", "opus", "leges", liber.id],
        queryFn: ()=>getLeges(liber.id)
    })

    const openLiberHandler = () => {
        setOpenLegesMenu((current) => !current)
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

                <ul className={classes.liber__leges_group__items}>
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