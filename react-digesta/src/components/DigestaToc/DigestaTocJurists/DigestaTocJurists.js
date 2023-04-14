import {useSelector} from "react-redux";
import DigestaJurist from "../DigestaJurist/DigestaJurist";

const DigestaTocJurists = () => {

    const jurists = useSelector(state=>state.digesta.jurists)
    return (
        <ul>
            Juryści
            {jurists && jurists.map((jurist)=>{return (<DigestaJurist jurist={jurist}/>)})}
        </ul>
    )
}

export default DigestaTocJurists
