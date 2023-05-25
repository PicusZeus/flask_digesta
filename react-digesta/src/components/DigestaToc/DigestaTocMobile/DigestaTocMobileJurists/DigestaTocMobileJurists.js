import {useNavigate} from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";
import {useDispatch} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";

const DigestaTocMobileJurists = ({jurists}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onOptionChangeHandler = (event) => {
        dispatch(digestaActions.setChosenJuristId(event.target.value))
        navigate(event.target.value)

    }
    return (

            <TocMobile onOption={onOptionChangeHandler}>

                <option key={'no_jurist'} value={''}>Wybierz Jurystę</option>

                {jurists && jurists.map(jurist => (
                    <option key={jurist.id} value={jurist.id}>{jurist.name}</option>))}
                })}

            </TocMobile>



    )
}

export default DigestaTocMobileJurists
