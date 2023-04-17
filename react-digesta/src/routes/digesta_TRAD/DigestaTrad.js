import classes from "./DigestaTrad.module.css";
import DigestaTocBooks from "../../components/DigestaToc/DigestaTocBooks/DigestaTocBooks";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";

const DigestaTrad = () => {

    const toc = useSelector((state) => state.digesta.TOC)

    return (
        <div className={classes.trad_main}>
            <h1 className={classes.trad_main__title}>Digesta - po spisie treści</h1>

            <div className={classes.trad_main__container}>

                {toc && <DigestaTocBooks toc={toc}/>}

                <Outlet/>

            </div>
        </div>
    )
}

export default DigestaTrad