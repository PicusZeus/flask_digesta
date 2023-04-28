import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import classes from "./DigestaTrad.module.css";
import DigestaTocBooks from "../../components/DigestaToc/DigestaTocBooks/DigestaTocBooks";


const DigestaTrad = () => {

    const toc = useSelector((state) => state.digesta.TOC)

    return (
        <div className={classes.trad_main}>
            <h1 className={classes.trad_main__title}>Digesta - po spisie treści</h1>

            <div className={classes.trad_main__container}>
                <h1>ENV {process.env.REACT_APP_BASE_URL}</h1>


                {toc && <DigestaTocBooks toc={toc} url={"/digesta"}/>}


                <Outlet/>
            </div>
        </div>
    )
}

export default DigestaTrad