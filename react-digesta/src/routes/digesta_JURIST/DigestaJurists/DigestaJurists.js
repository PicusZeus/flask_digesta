import classes from "./DigestaJurists.module.css"
import DigestaTocJurists from "../../../components/DigestaToc/DigestaTocJurists/DigestaTocJurists";
import {Outlet} from "react-router-dom";

const DigestaJurists = () => {

    return (
        <div className={classes.auth_main}>
            <h1 className={classes.auth_main__title}>Digesta - po autorze</h1>
            <div className={classes.auth_main__container}>

                <DigestaTocJurists/>

            </div>
            <Outlet/>
        </div>
    )
}

export default DigestaJurists