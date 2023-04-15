import {useSelector} from "react-redux";
import DigestaTocJurist from "../DigestaTocJurist/DigestaTocJurist";

const DigestaTocJurists = () => {

    const jurists = useSelector(state=>state.digesta.jurists)
    return (
        <ul>
            Juryści
            {jurists && jurists.map((jurist)=>{return (<DigestaTocJurist key={jurist.id} jurist={jurist}/>)})}
        </ul>
    )
}

export default DigestaTocJurists
