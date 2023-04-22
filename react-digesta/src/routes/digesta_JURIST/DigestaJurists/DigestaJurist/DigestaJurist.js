import {Outlet, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import classes from "./DigestaJurist.module.css"

const DigestaJurist = () => {
    const param = useParams()
    const juristId = parseInt(param.jurysta_id)
    const jurists = useSelector(state => state.digesta.jurists)
    let jurist


    const pathDigestaJurist = "digesta/" + juristId
    const pathOperaJurist = "opera/" + juristId
    if (jurists) {
        jurist = jurists.filter(jurist => {
            return (jurist.id === juristId)
        })[0]
    }


    return (

        (jurists ? <div className={classes.main_jurist}>
            <h1 className={classes.main_jurist__title}>{jurist.name}</h1>
            <p className={classes.main_jurist__description}>{jurist.description}</p>
            <div className={classes.main_jurist__redirections}>
                <Link to={pathDigestaJurist}>
                    <button>w digestach</button>
                </Link>
                <Link to={pathOperaJurist}>
                    <button>według cytowanych w digestach prac</button>
                </Link>
            </div>
            <Outlet/>
        </div> : <div></div>)

    )
}

export default DigestaJurist