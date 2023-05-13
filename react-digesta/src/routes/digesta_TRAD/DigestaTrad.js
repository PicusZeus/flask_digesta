import {json, Outlet} from "react-router-dom";
import classes from "./DigestaTrad.module.css";
import DigestaTocMobileBooks
    from "../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileBooks/DigestaTocMobileBooks";
import DigestaTocDesktopBooks
    from "../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopBooks/DigestaTocDesktopBooks";
import api from "../../api/api";
import {useQuery} from "@tanstack/react-query";

const getBooks = () => {
    return api.get("digesta/books").then((response)=>{
        return response.data
    }).catch(()=>{
        throw json(
            {message: "Nie udało się załadować spisu treści Digestów"},
            {status: 500}
        )
    })
}

const getBooksQuery = () => {
    return {
        queryKey: ["books"],
        queryFn: getBooks
    }
}



const DigestaTrad = () => {
    const { data: books } = useQuery(getBooksQuery())
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