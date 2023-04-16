import classes from "./DigestaAuth.module.css"
import DigestaTocJurists from "../../components/DigestaToc/DigestaTocJurists/DigestaTocJurists";
import DigestaLexViewer from "../../components/DigestaLexViewer/DigestaLexViewer";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadJurists} from "../../store/digesta-actions";
import {Outlet} from "react-router-dom";

const DigestaAuth = () => {
    const lexId = useSelector(state => state.digesta.lexId)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loadJurists())
    }, [dispatch])


    return (
        <>
            <h1>Digesta - po autorze</h1>
            <div className={classes.main}>
                <section className={classes.toc}>
                    <DigestaTocJurists/>
                </section>

                <Outlet/>

            </div>
        </>
    )
}

export default DigestaAuth