import {useDispatch} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import {useNavigate} from "react-router-dom";
import DigestaTocDesktopBook from "../DigestaTocDesktopBook/DigestaTocDesktopBook";


const DigestaTocDesktopBooks = (props) => {
    const toc = props.toc


    const dispatch = useDispatch()
    const nevigate = useNavigate()
    return (
        <>
            <h4>Digesta Iustiniani</h4>
            <ul>
                {toc && toc.map((book) => (
                    <DigestaTocDesktopBook book={book}/>

                    ))}
            </ul>


        </>

    )
}

export default DigestaTocDesktopBooks