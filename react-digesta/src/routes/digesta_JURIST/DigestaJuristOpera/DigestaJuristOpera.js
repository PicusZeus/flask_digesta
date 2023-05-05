import {json, Outlet, useLoaderData} from "react-router-dom";
import classes from "./DigestaJuristOpera.module.css"
import DigestaTocDesktopOpera
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopOpera/DigestaTocDesktopOpera";

const DigestaJuristOpera = () => {
    const opera = useLoaderData()

   return (
        <div className={classes.opera_main}>
            <h1 className={classes.opera_main__title}>Prace cytowane w Digestach</h1>
            <div className={classes.opera_main__container}>
                <div className={classes.opera__mobile_toc}>

                </div>
                <div className={classes.opera__desktop_toc}>
                    <DigestaTocDesktopOpera opera={opera}/>
                </div>

                <div className={classes.opera_main__outlet}>

                    <Outlet/>
                </div>
            </div>
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