import classes from "./DigestaJurists.module.css"
import DigestaTocMobileJurists from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileJurists/DigestaTocMobileJurists";
import {Outlet} from "react-router-dom";
import DigestaTocDesktopJurists
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopJurists/DigestaTocDesktopJurists";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import NotificationService from "../../../services/notification.service";

const DigestaJurists = () => {
    const [jurists, setJurists] = useState([])

    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "authors")
            if (!response.ok) {
                throw new Error('Błąd serwera')
            }

            return response.json()

        }
        sendRequest().then((response) => {
            setJurists(response)
        }).catch((error)=>{
            notificationSetter.setNotificationError('ładowanie', error.message)
        })
    }, [notificationSetter, jurists])

    return (
        <div className={classes.jurists_main}>
            <h1 className={classes.jurists_main__title}>Digesta - po autorze</h1>
            <div className={classes.jurists_main__container}>
                <div className={classes.jurists_main__mobile_toc}>
                    <DigestaTocMobileJurists jurists = {jurists}/>

                </div>
                <div className={classes.jurists_main__desktop_toc}>
                    <DigestaTocDesktopJurists jurists = {jurists}/>

                </div>
                <div className={classes.jurists_main__outlet}>

                    <Outlet/>
                </div>

            </div>

        </div>
    )
}

export default DigestaJurists