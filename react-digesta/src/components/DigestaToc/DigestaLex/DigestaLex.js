import {Link} from "react-router-dom";

const DigestaLex = (props) => {

    return (
        <li><Link to={props.id.toString()}>{props.lex_nr}</Link></li>
    )
}

export default DigestaLex