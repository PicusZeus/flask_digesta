import {Link} from "react-router-dom";
import classes from "./DigestaTocDesktopJurist.module.css"
import {useDispatch, useSelector} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import {useEffect, useRef} from "react";

const DigestaTocDesktopJurist = ({jurist}) => {
    const ref = useRef(null)
    const dispatch = useDispatch()
    const selectJuristHandler = () => {
        dispatch(digestaActions.setChosenJuristId(jurist.id))
    }


    const chosenJuristId = useSelector(state => state.digesta.chosenJuristId)
    useEffect(() => {
        if (chosenJuristId === jurist.id && ref.current) {
            ref.current.scrollIntoView({behavior: "smooth", block: "start"})
        }
    })
    const classJurist = [classes.main_jurist__link]
    if (chosenJuristId === jurist.id) {
        classJurist.push(classes.chosen)
    }

    return (
        <li ref={ref} className={classes.main_jurist}>
            <Link onClick={selectJuristHandler} className={classJurist.join(" ")}
                  to={jurist.id.toString()}>{jurist.name}</Link>
        </li>
    )
}

export default DigestaTocDesktopJurist