import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import classes from "./DigestaTrad.module.css";
import DigestaTocMobileBooks
    from "../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileBooks/DigestaTocMobileBooks";
import DigestaTocDesktopBooks
    from "../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopBooks/DigestaTocDesktopBooks";


const DigestaTrad = () => {

    const toc = useSelector((state) => state.digesta.TOC)

    return (
        <div className={classes.trad_main}>
            <h1 className={classes.trad_main__title}>Digesta - po spisie treści</h1>

            <div className={classes.trad_main__container}>

                <div className={classes.trad_main__mobile_toc}>
                    {toc && <DigestaTocMobileBooks toc={toc} url={"/digesta"}/>}

                </div>
                <div className={classes.trad_main__desktop_toc}>
                    {toc && <DigestaTocDesktopBooks toc={toc}/>}
                </div>


                <Outlet/>
            </div>
        </div>
    )
}

export default DigestaTrad