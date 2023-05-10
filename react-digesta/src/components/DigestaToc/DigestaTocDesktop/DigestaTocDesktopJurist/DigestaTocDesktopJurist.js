import {Link} from "react-router-dom";
import classes from "./DigestaTocDesktopJurist.module.css"
import {useDispatch, useSelector} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";

const DigestaTocDesktopJurist = ({jurist}) => {
    const dispatch = useDispatch()
    const selectJuristHandler = () => {
        dispatch(digestaActions.setChosenJuristId(jurist.id))
    }

    const chosenJuristId = useSelector(state=>state.digesta.chosenJuristId)

    const classJurist = [classes.main_jurist__link]
    if (chosenJuristId === jurist.id) {
        classJurist.push(classes.chosen)
    }

    return (
        <li className={classes.main_jurist}>
            <Link onClick={selectJuristHandler} className={classJurist.join(" ")} to={jurist.id.toString()}>{jurist.name}</Link>
        </li>
    )
}

export default DigestaTocDesktopJurist