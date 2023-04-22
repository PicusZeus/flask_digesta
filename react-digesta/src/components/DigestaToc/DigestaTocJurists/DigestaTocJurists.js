import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import classes from "./DigestaTocJurists.module.css"

const DigestaTocJurists = () => {

    const jurists = useSelector(state => state.digesta.jurists)
    const navigate = useNavigate()
    const onOptionChangeHandler = (event) => {

        navigate(event.target.value)

    }
    return (
        <>
            <label className={classes.main_toc__label}>Wybierz Jurystę</label>

            <select className={classes.main_toc__jurist_option} onChange={onOptionChangeHandler}>
                <option value={''}>Wybierz Jurystę</option>

                {jurists && jurists.map(jurist => (
                    <option key={jurist.id} value={jurist.id}>{jurist.name}</option>))}
                })}
            </select>


        </>

    )
}

export default DigestaTocJurists
