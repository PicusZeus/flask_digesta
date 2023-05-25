import {Outlet, useLocation, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import classes from "./DigestaJurist.module.css"
import {useState} from "react";
import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {getJurist} from "../../../api/api";
import Spinner from "../../../components/UI/spinner/Spinner";
import {useDispatch} from "react-redux";
import {uiActions} from "../../../store/ui-slice";
import AuthorPieChart from "../../../components/charts/authorPieChart/AuthorPieChart";

const getJuristQuery = (id) => {
    return {
        queryKey: ["jurists", id],
        queryFn: () => getJurist(id)
    }
}


const DigestaJurist = () => {
    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const opera = location.pathname.split("/").includes("opera")
    const {data: juristData, isFetching} = useQuery(getJuristQuery(params.jurysta_id))
    console.log(juristData, 'jurdata')

    const digesta = location.pathname.split("/").includes("digesta")
    const juristId = parseInt(juristData.id)
    const [openOutlet, setOpenHandler] = useState(false)
    const pathDigestaJurist = "digesta/" + juristId
    const pathOperaJurist = "opera/" + juristId
    useEffect(() => {
        if (!opera && !digesta) {
            setOpenHandler(false)
        } else {
            setOpenHandler(true)
        }


    }, [digesta, opera, juristId])

    if (isFetching) {
        return <Spinner/>
    }

    const jurist_info = <div className={classes.main_jurist__container}>
        <div className={classes.main_jurist__info}>

            <div className={classes.main_jurist__title_group}>

                <h1 className={classes.main_jurist__title}>{juristData.name}</h1>

                <div className={classes.pie}><AuthorPieChart author={juristData.name}
                                                             authorship={juristData.authorship}/></div>

            </div>

            <div className={classes.main_jurist__redirections}>
                <Link onClick={() => setOpenHandler(true)} to={pathDigestaJurist}>
                    <span>Zobacz w układzie Digestów</span>
                </Link>
                <Link onClick={() => setOpenHandler(true)} to={pathOperaJurist}>
                    <span>Zobacz prace</span>
                </Link>
                <Link onClick={()=> {dispatch(uiActions.setActiveSection("statisticsNav"))}} to={"/statystyki/jurysci/" + juristId}>
                    <span>Przejdź do statystyk</span>
                </Link>
            </div>
            <p className={classes.main_jurist__description}>{juristData.description}</p>

        </div>


    </div>


    return (
        <div className={classes.main_jurist}>
            {openOutlet && <div className={classes.main_jurist__outlet_desktop}>
                <Outlet/>
            </div>}
            {jurist_info}
            <div className={classes.main_jurist__outlet_mobile}>
                <Outlet/>
            </div>
        </div>
    )
}


export default DigestaJurist


export const loader = (queryClient) => async ({params}) => {
    const query = getJuristQuery(params.jurysta_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}