import classes from "./DigestaJurists.module.css"
import DigestaTocJurists from "../../components/DigestaToc/DigestaTocJurists/DigestaTocJurists";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadJurists} from "../../store/digesta-actions";
import {Outlet} from "react-router-dom";

const DigestaJurists = () => {
    // const lexId = useSelector(state => state.digesta.lexId)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loadJurists())
    }, [dispatch])


    return (
        <div className={classes.auth_main}>
            <h1 className={classes.auth_main__title}>Digesta - po autorze</h1>
            <div className={classes.auth_main__container}>

                <DigestaTocJurists/>


                <Outlet/>

            </div>
        </div>
    )
}

export default DigestaJurists