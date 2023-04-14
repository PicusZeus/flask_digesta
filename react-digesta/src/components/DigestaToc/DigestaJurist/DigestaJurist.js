import {Link} from "react-router-dom";

const DigestaJurist = (props) => {
    return (
        <li key={props.jurist.id}>
            <Link to={props.jurist.name}>{props.jurist.name}</Link>
        </li>
    )


}

export default DigestaJurist