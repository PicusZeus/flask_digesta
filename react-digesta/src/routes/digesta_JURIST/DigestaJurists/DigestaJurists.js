import classes from "./DigestaJurists.module.css"
import DigestaTocMobileJurists
    from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileJurists/DigestaTocMobileJurists";
import {json, Outlet} from "react-router-dom";
import DigestaTocDesktopJurists
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopJurists/DigestaTocDesktopJurists";

import api from "../../../api/api";
import {useQuery} from "@tanstack/react-query";


const getJurists = () => {
    return api.get("authors").then((response) => {
        return response.data
    }).catch(() => {
        throw json(
            {message: "Nie udało się załadować listy jurystów"},
            {status: 500}
        )}
    )
}
const getJuristsQuery = () => {
    return {
        queryKey: ["jurists"],
        queryFn: getJurists
    }
}

const DigestaJurists = () => {

    const { data: jurists } = useQuery(getJuristsQuery())

    return (
        <div className={classes.jurists_main}>
            <h1 className={classes.jurists_main__title}>Digesta - po autorze</h1>
            <div className={classes.jurists_main__container}>
                <div className={classes.jurists_main__mobile_toc}>
                    <DigestaTocMobileJurists jurists={jurists}/>
                </div>
                <div className={classes.jurists_main__desktop_toc}>
                    <DigestaTocDesktopJurists jurists={jurists}/>
                </div>
                <div className={classes.jurists_main__outlet}>
                    <Outlet/>
                </div>

            </div>

        </div>
    )
}

export default DigestaJurists


export const loader = (queryClient) => async () => {
    const query = getJuristsQuery()
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}



