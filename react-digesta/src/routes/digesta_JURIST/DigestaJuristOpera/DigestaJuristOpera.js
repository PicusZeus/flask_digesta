import {json, Outlet, useLoaderData} from "react-router-dom";
import DigestaTocMobileOpera
    from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileOpera/DigestaTocMobileOpera";
import classes from "./DigestaJuristOpera.module.css"
import DigestaTocDesktopOpera
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopOpera/DigestaTocDesktopOpera";

const DigestaJuristOpera = () => {
    const toc = useLoaderData()
    console.log(toc)
    return (
        <div>
            <div className={classes.mobile_toc}>

                <DigestaTocMobileOpera toc={toc}/>
            </div>

            <div className={classes.desktop_toc}>
                <DigestaTocDesktopOpera toc={toc}/>

            </div>
            <Outlet/>

        </div>

    )
}

export default DigestaJuristOpera

export const loader = async ({params, request}) => {
    const id = params.jurysta_id;
    const response = await fetch(process.env.REACT_APP_BASE_API_URL + "opera/jurist/" + id)

    if (!response.ok) {
        throw json(
            {message: 'Nie udało załadować się spisu prac'},
            {status: 500}
        )
    } else {
        const data = await response.json()
        return data
    }
}