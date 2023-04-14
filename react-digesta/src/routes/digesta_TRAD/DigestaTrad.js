import classes from "./DigestaTrad.module.css";
import DigestaToc from "../../components/DigestaToc/DigestaToc";
import DigestaLexViewer from "../../components/DigestaLexViewer/DigestaLexViewer";
import {useSelector} from "react-redux";

const DigestaTrad = () => {

    const lexId = useSelector(state=>state.digesta.lexId)
    const toc = useSelector((state) => state.digesta.TOC)

    return (
        <>
            <h1>Digesta - po spisie treści</h1>

            <div className={classes.main}>
                <section className={classes.toc}>
                    <DigestaToc toc={toc}/>
                </section>

                {lexId && <DigestaLexViewer/>}


            </div>
        </>
    )
}

export default DigestaTrad