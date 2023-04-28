import {json, Outlet, useLoaderData} from "react-router-dom";
import DigestaTocMobileOpera from "../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileOpera/DigestaTocMobileOpera";
import classes from "./DigestaOpera.module.css";
import DigestaTocDesktopOpera
    from "../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopOpera/DigestaTocDesktopOpera";

const DigestaOpera = () => {
    const toc = useLoaderData()

    return (
        <div className={classes.opera_main}>
            <h1 className={classes.opera_main__title}>Prace cytowane w Digestach</h1>
            <div className={classes.opera_main__container}>
                <div className={classes.opera__mobile_toc}>
                    <DigestaTocMobileOpera toc={toc}/>

                </div>
                <div className={classes.opera__desktop_toc}>
                    <DigestaTocDesktopOpera toc={toc}/>
                </div>

                <Outlet/>
            </div>
        </div>
    )


}

export default DigestaOpera


export const loader = async () => {

    const response = await fetch(process.env.REACT_APP_BASE_API_URL + "opera")
    if (!response.ok) {
        throw json(
            {message: 'Nie udało się załadować spisu dzieł jurystów'},
            {status: 500}
        )

    } else {
        const data = await response.json()


        return data
    }
}