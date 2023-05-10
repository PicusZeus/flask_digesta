import {json, Outlet, useLoaderData, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import classes from "./DigestaJurist.module.css"
import {useState} from "react";
import {useEffect} from "react";

const DigestaJurist = () => {
    const juristData = useLoaderData()
    // const param = useParams()
    const juristId = parseInt(juristData.id)
    // const jurists = useSelector(state => state.digesta.jurists)
    // let jurist
    const [openOutlet, setOpenHandler] = useState(false)
    console.log('JURYSTA')
    const pathDigestaJurist = "digesta/" + juristId
    const pathOperaJurist = "opera/" + juristId
    useEffect(() => {
        setOpenHandler(false)

    }, [juristId])
    // if (jurists) {
    //     jurist = jurists.filter(jurist => {
    //         return (jurist.id === juristId)
    //     })[0]
    //
    // }
    // let jurist_info = false


    const jurist_info = <div className={classes.main_jurist__container}>
            <div className={classes.main_jurist__info}>
                <h1 className={classes.main_jurist__title}>{juristData.name}</h1>
                <p className={classes.main_jurist__description}>{juristData.description}</p>

            </div>

            <div className={classes.main_jurist__redirections}>
                <Link to={pathDigestaJurist}>
                    <button onClick={() => setOpenHandler(true)}>w digestach</button>
                </Link>
                <Link to={pathOperaJurist}>
                    <button onClick={() => setOpenHandler(true)}>według cytowanych w digestach prac</button>
                </Link>
            </div>
            {/*<div className={classes.main_jurist__outlet_mobile}>*/}
            {/*    <Outlet/>*/}
            {/*</div>*/}
        </div>



    return (

        <div className={classes.main_jurist}>


            {openOutlet && <div className={classes.main_jurist__outlet_desktop}>
                <Outlet/>
            </div>}
            {jurist_info}
            <div className={classes.main_jurist__outlet_mobile}>
                {/*{jurist_info}*/}
                <Outlet/>
            </div>
        </div>


    )
}


export default DigestaJurist

export const loader = async ({params, request}) => {
    const id = params.jurysta_id
    const response = await fetch(process.env.REACT_APP_BASE_API_URL + `authors/${id}`)

    if (!response.ok) {
        throw json(
            {message: 'Błąd serwera'},
            {status: 500}
        )
    } else {
        return await response.json()
    }
}