import classes from "./DigestaTrad.module.css";
import DigestaToc from "../../components/DigestaToc/DigestaToc";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";

const DigestaTrad = () => {

    const toc = useSelector((state) => state.digesta.TOC)

    return (
        <>
            <h1>Digesta - po spisie treści</h1>

            <div className={classes.main}>
                <section className={classes.toc}>
                    {toc && <DigestaToc toc={toc}/>}
                </section>
                <Outlet/>

            </div>
        </>
    )
}

export default DigestaTrad