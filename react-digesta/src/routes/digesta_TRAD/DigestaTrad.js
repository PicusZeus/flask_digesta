import {Outlet} from "react-router-dom";
import classes from "./DigestaTrad.module.css";
import DigestaTocMobileBooks
    from "../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileBooks/DigestaTocMobileBooks";
import DigestaTocDesktopBooks
    from "../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopBooks/DigestaTocDesktopBooks";
import {useQuery} from "@tanstack/react-query";
import {getBooks} from "../../api/api";
import {useDispatch} from "react-redux";
import NotificationService from "../../services/notification.service";
import Spinner from "../../components/UI/spinner/Spinner";


const getBooksQuery = () => {
    return {
        queryKey: ["books"],
        queryFn: getBooks

    }
}



const DigestaTrad = () => {
    const dispatch = useDispatch()
    const notificationsSetter = new NotificationService(dispatch)

    const { data: books, isFetching } = useQuery(
        {...getBooksQuery(),
            onError: ()=>{notificationsSetter.setNotificationError("Błąd ładowania", "Nie powiodło się ładowanie spisu treści")}
        }
    )
    if (isFetching) {return <Spinner/>}

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



export const loader = (queryClient) => async () => {
    const query = getBooksQuery()
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}