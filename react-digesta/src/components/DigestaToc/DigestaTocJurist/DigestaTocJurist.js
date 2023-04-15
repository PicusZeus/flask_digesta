import {Link} from "react-router-dom";

const DigestaTocJurist = (props) => {
    return (
        <li key={props.jurist.id}>
            <Link to={props.jurist.id.toString()}>{props.jurist.name}</Link>
        </li>
    )


}

export default DigestaTocJurist