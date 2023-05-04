import classes from "./DigestaJurists.module.css"
import DigestaTocMobileJurists from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileJurists/DigestaTocMobileJurists";
import {Outlet} from "react-router-dom";
import DigestaTocDesktopJurists
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopJurists/DigestaTocDesktopJurists";

const DigestaJurists = () => {

    return (
        <div className={classes.jurists_main}>
            <h1 className={classes.jurists_main__title}>Digesta - po autorze</h1>
            <div className={classes.jurists_main__container}>
                <div className={classes.jurists_main__mobile_toc}>
                    <DigestaTocMobileJurists/>

                </div>
                <div className={classes.jurists_main__desktop_toc}>
                    <DigestaTocDesktopJurists/>

                </div>
                <div className={classes.jurists_main__outlet}>

                    <Outlet/>
                </div>

            </div>

        </div>
    )
}

export default DigestaJurists