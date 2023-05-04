import {Outlet, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import classes from "./DigestaJurist.module.css"
import {useState} from "react";
import {useEffect} from "react";

const DigestaJurist = () => {
    const param = useParams()
    const juristId = parseInt(param.jurysta_id)
    const jurists = useSelector(state => state.digesta.jurists)
    let jurist
    const [openOutlet, setOpenHandler] = useState(false)


    const pathDigestaJurist = "digesta/" + juristId
    const pathOperaJurist = "opera/" + juristId
    useEffect(() => {
        setOpenHandler(false)

    }, [juristId])
    if (jurists) {
        jurist = jurists.filter(jurist => {
            return (jurist.id === juristId)
        })[0]

    }
    let jurist_info = false

    if (jurist) {
    jurist_info = <div className={classes.main_jurist__container}>
        <div className={classes.main_jurist__info}>
            <h1 className={classes.main_jurist__title}>{jurist.name}</h1>
            <p className={classes.main_jurist__description}>{jurist.description}</p>

        </div>

        <div className={classes.main_jurist__redirections}>
            <Link to={pathDigestaJurist}>
                <button onClick={() => setOpenHandler(true)}>w digestach</button>
            </Link>
            <Link to={pathOperaJurist}>
                <button onClick={() => setOpenHandler(true)}>według cytowanych w digestach prac</button>
            </Link>
        </div>
        <div className={classes.main_jurist__outlet_mobile}>
            <Outlet/>
        </div>
    </div>}


    return (

        <div className={classes.main_jurist}>


            {openOutlet && <div className={classes.main_jurist__outlet_desktop}>
                <Outlet/>
            </div>}
            {!openOutlet && jurist_info}
        </div>

)}



            export default DigestaJurist