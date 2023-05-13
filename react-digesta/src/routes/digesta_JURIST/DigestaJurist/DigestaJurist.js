import {json, Outlet, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import classes from "./DigestaJurist.module.css"
import {useState} from "react";
import {useEffect} from "react";
import api from "../../../api/api";
import {useQuery} from "@tanstack/react-query";


const getJurist = (id) => {
    return api.get(`authors/${id}`).then((response)=> {
        return response.data
    }).catch(()=>{
        throw json(
           {message: 'Nie udało się załadować danych dla tego jurysty'},
            {status: 500}
        )
    })
}

const getJuristQuery = (id) => {
    return {
        queryKey: ["jurists", id],
        queryFn: () => getJurist(id)
    }
}


const DigestaJurist = () => {
    const params = useParams()
    const { data: juristData } = useQuery(getJuristQuery(params.jurysta_id))
    const juristId = parseInt(juristData.id)
    const [openOutlet, setOpenHandler] = useState(false)
    const pathDigestaJurist = "digesta/" + juristId
    const pathOperaJurist = "opera/" + juristId
    useEffect(() => {
        setOpenHandler(false)

    }, [juristId])

    const [clicked, setClicked] = useState(false)

    const jurist_info = <div className={classes.main_jurist__container}>
            <div className={classes.main_jurist__info}>
                <h1 className={classes.main_jurist__title}>{juristData.name}</h1>
                <p className={classes.main_jurist__description}>{juristData.description}</p>

                    <div>
            <p style={clicked ? {color: "red"} : {color: "white"}}>Style me!</p>
            <button onClick={()=>setClicked(current=>!current)}>Toggle style</button>
        </div>
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