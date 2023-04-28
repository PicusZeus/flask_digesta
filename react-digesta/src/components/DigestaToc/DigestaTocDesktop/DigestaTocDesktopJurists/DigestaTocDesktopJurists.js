import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


const DigestaTocDesktopJurists = () => {

    const jurists = useSelector(state=>state.digesta.jurists)

    return (
        <div>
            <h2>Juryści z Digestów</h2>
            <ul>
                {jurists && jurists.map((jurist)=>(<li><Link to={jurist.id.toString()}>{jurist.name}</Link></li>))}
            </ul>
        </div>
    )
}
export default DigestaTocDesktopJurists