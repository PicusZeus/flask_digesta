import {Link} from "react-router-dom";


const DigestaTocOpusLex = (props) => {
    const id = props.lex_id.toString()
    return (
        <li><Link to={id}>lex</Link></li>
    )
}

export default DigestaTocOpusLex