import classes from "./DigestaJurists.module.css"
import DigestaTocMobileJurists from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileJurists/DigestaTocMobileJurists";
import {Outlet} from "react-router-dom";
import DigestaTocDesktopJurists
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopJurists/DigestaTocDesktopJurists";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import NotificationService from "../../../services/notification.service";
import api from "../../../api/api";

const DigestaJurists = () => {
    const [jurists, setJurists] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        const notificationSetter = new NotificationService(dispatch)


        const sendRequest = async () => {
            return await api.get("authors")
        }
        sendRequest().then((response) => {
            setJurists(response.data)
        }).catch((error)=>{
            notificationSetter.setNotificationError('Ładowanie spisu jurystów nie powiodło się', error.message)
        })
    }, [dispatch, jurists])

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