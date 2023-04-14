import {useDispatch} from "react-redux";
import {digestaActions} from "../../../store/digesta-slice";



const DigestaLex = (props) => {
    const dispatch = useDispatch()
    const openLexHandler = (id) => {

        dispatch(digestaActions.setLexId(id))
    }

    return (
        <li onClick={()=>openLexHandler(props.id)}>{props.lex_nr}</li>
    )
}

export default DigestaLex