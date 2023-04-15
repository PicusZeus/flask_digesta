import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadOpera} from "../../../store/digesta-actions";
import DigestaTocOpus from "./DigestaTocOpus/DigestaTocOpus";

const DigestaTocOpera = (props) => {
    const dispatch = useDispatch()
    const opera = useSelector(state => state.digesta.opera)
    useEffect(()=>{dispatch(loadOpera(props.juristId))}, [props.juristId, dispatch])
    // console.log(opera)
    return (
        <div>
            { opera && opera.opera.map((opus) => {return <DigestaTocOpus key={opus.id} opus={opus} />}) }
        </div>
    )
}

export default DigestaTocOpera