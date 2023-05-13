import {json, Outlet, useLoaderData} from "react-router-dom";
import classes from "./DigestaTrad.module.css";
import DigestaTocMobileBooks
    from "../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileBooks/DigestaTocMobileBooks";
import DigestaTocDesktopBooks
    from "../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopBooks/DigestaTocDesktopBooks";

const DigestaTrad = () => {
    const books = useLoaderData()

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


export const loader = async () => {
    const response = await fetch(process.env.REACT_APP_BASE_API_URL + "digesta/books")
    if (!response.ok) {
        throw json(
            {message: "Nie udało się załadować listy ksiąg digestów"},
            {status: 500}
        )
    } else {
        return await response.json()
    }

}