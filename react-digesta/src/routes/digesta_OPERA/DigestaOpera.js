import {Outlet} from "react-router-dom";
import DigestaTocMobileOpera
    from "../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileOpera/DigestaTocMobileOpera";
import classes from "./DigestaOpera.module.css";
import DigestaTocDesktopOpera
    from "../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopOpera/DigestaTocDesktopOpera";
import {useQuery} from "@tanstack/react-query";
import {getOpera} from "../../api/api";


const getOperaQuery = () => {
    return {
        queryKey: ["opera"],
        queryFn: getOpera
    }
}


const DigestaOpera = () => {
    const { data: opera } = useQuery(getOperaQuery())

    return (
        <div className={classes.opera_main}>
            <h1 className={classes.opera_main__title}>Prace cytowane w Digestach</h1>
            <div className={classes.opera_main__container}>
                <div className={classes.opera__mobile_toc}>
                    <DigestaTocMobileOpera opera={opera} lexPath="/opera/"/>

                </div>
                <div className={classes.opera__desktop_toc}>
                    <DigestaTocDesktopOpera opera={opera} lexPath="/opera/"/>
                </div>

                <div className={classes.opera_main__outlet}>

                    <Outlet/>
                </div>
            </div>
        </div>
    )


}

export default DigestaOpera

export const loader = (queryClient) => async () => {
    const query = getOperaQuery()
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}