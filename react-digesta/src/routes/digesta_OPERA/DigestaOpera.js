import {json, Outlet, useLoaderData} from "react-router-dom";
import DigestaTocOpera from "../../components/DigestaToc/DigestaTocOpera/DigestaTocOpera";
import classes from "./DigestaOpera.module.css";

const DigestaOpera = () => {
    const toc = useLoaderData()

    return (
        <div className={classes.opera_main}>
            <h1 className={classes.opera_main__title}>Prace cytowane w Digestach</h1>
            <div className={classes.opera_main__container}>

                <DigestaTocOpera toc={toc}/>
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