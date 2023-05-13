import {json, Outlet, useLoaderData, useParams} from "react-router-dom";
import classes from "./DigestaJuristOpera.module.css"
import DigestaTocDesktopOpera
    from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopOpera/DigestaTocDesktopOpera";
import DigestaTocMobileOpera
    from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileOpera/DigestaTocMobileOpera";
import api from "../../../api/api";
import {useQuery} from "@tanstack/react-query";

const getJuristOpera = (id) => {
    return api.get("opera/jurist/" + id).then(response=>{
        return response.data
    }).catch((e)=>{
        throw json(
            {message: "Nie udało załadować się spisu prac jurysty"},
            {status: e.status}
        )
    })
}

const getJuristOperaQuery = (id) => {
    return {
        queryKey: ["opera", "jurist", id],
        queryFn: ()=>getJuristOpera(id)
    }
}


const DigestaJuristOpera = () => {



    const params = useParams()
    const { data: opera } = useQuery(getJuristOperaQuery(params.jurysta_id))
    const lexPath = `/jurysci/opera/${params.jurysta_id}/`
    return (
        <div className={classes.opera_main}>
            <h1 className={classes.opera_main__title}>Prace cytowane w Digestach</h1>
            <div className={classes.opera_main__container}>
                <div className={classes.opera__mobile_toc}>
                    <DigestaTocMobileOpera opera={opera} lexPath={lexPath}/>
                </div>
                <div className={classes.opera__desktop_toc}>
                    <DigestaTocDesktopOpera opera={opera} lexPath={lexPath}/>
                </div>


                <div className={classes.opera_main__outlet}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default DigestaJuristOpera

export const loader = (queryClient) => async ({params}) => {
    const query = getJuristOperaQuery(params.jurysta_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}

