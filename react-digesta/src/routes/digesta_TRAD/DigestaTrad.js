import {Outlet} from "react-router-dom";
import classes from "./DigestaTrad.module.css";
import DigestaTocMobileBooks
    from "../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileBooks/DigestaTocMobileBooks";
import DigestaTocDesktopBooks
    from "../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopBooks/DigestaTocDesktopBooks";
import NotificationService from "../../services/notification.service";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
const DigestaTrad = () => {

    const [books, setBooks] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
       const notificationSetter = new NotificationService(dispatch)
        const sendRequest = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "digesta/books")
            if (!response.ok) {
                throw new Error('Błąd serwera')
            }

            return response.json()

        }
        sendRequest().then((response) => {
            setBooks(response)
        }).catch((error)=>{
            notificationSetter.setNotificationError('ładowanie', error.message)
        })
    }, [dispatch])

    return (
        <div className={classes.trad_main}>
            <h1 className={classes.trad_main__title}>Digesta - po spisie treści</h1>

            <div className={classes.trad_main__container}>

                <div className={classes.trad_main__mobile_toc}>
                    {books && <DigestaTocMobileBooks toc={books} url={"/digesta/"}/>}

                </div>
                <div className={classes.trad_main__desktop_toc}>
                    {books && <DigestaTocDesktopBooks books={books}/>}
                </div>

                <div className={classes.trad_main__outlet}>
                    <Outlet/>
                </div>

            </div>
        </div>
    )
}

export default DigestaTrad