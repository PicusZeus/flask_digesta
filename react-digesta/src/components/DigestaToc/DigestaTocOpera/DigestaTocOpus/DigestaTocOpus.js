
import {Link} from "react-router-dom";

const DigestaTocOpus = (props) => {

    return (
        <Link to={props.opus.id.toString()}>{props.opus.book} {props.opus.title_lat}</Link>
    )
}

export default DigestaTocOpus