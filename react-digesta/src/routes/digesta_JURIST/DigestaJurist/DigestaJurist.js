import {Outlet, useLocation, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import classes from "./DigestaJurist.module.css"
import {useState} from "react";
import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {getJurist} from "../../../api/api";
import BooksShareChart from "../../../components/charts/BooksShareChart/BooksShareChart";
import BooksAuthorshipChart from "../../../components/charts/BooksAuthorshipChart/BooksAuthorshipChart";
import TitulusAuthorshipChart from "../../../components/charts/titulusAuthorshipChart/TitulusAuthorshipChart";


const getJuristQuery = (id) => {
    return {
        queryKey: ["jurists", id],
        queryFn: () => getJurist(id)
    }
}


const DigestaJurist = () => {
    const params = useParams()
    const location = useLocation()
    const opera = location.pathname.split("/").includes("opera")
    const {data: juristData} = useQuery(getJuristQuery(params.jurysta_id))
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



    const jurist_info = <div className={classes.main_jurist__container}>
        <div className={classes.main_jurist__info}>
            <h1 className={classes.main_jurist__title}>{juristData.name}</h1>
            <p className={classes.main_jurist__description}>{juristData.description}</p>
            {/*<BooksShareChart bookAuthorship={juristData.books_authorship}/>*/}
            {/*<AuhtorshipBooksChart jurist={juristData.name} authorship={juristData.authorship}/>*/}
            {/*<TitulusAuthorshipChart tituliAuthorship={juristData.tituli_authorship}/>*/}

        </div>
        <div className={classes.main_jurist__redirections}>
            <Link to={pathDigestaJurist}>
                <button onClick={() => setOpenHandler(true)}>w digestach</button>
            </Link>
            <Link to={pathOperaJurist}>
                <button onClick={() => setOpenHandler(true)}>według cytowanych w digestach prac</button>
            </Link>
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