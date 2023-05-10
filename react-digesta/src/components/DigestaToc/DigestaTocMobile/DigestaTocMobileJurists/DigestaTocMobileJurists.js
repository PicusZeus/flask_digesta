import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import classes from "./DigestaTocMobileJurists.module.css"
import TocMobile from "../../../UI/TocMobile/TocMobile";

const DigestaTocMobileJurists = ({jurists}) => {

    // const jurists = useSelector(state => state.digesta.jurists)
    const navigate = useNavigate()
    const onOptionChangeHandler = (event) => {

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
