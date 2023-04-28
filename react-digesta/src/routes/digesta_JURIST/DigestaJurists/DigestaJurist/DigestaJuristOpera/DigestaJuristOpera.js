import {json, Outlet, useLoaderData} from "react-router-dom";
import DigestaTocOpera from "../../../../../components/DigestaToc/DigestaTocOpera/DigestaTocOpera";


const DigestaJuristOpera = () => {
    const toc = useLoaderData()
    return (
        <div >
            <h1>OPERA</h1>
            <DigestaTocOpera toc={toc}/>
            <Outlet/>

        </div>

    )
}

export default DigestaJuristOpera

export const loader = async ({params, request}) => {
    const id = params.jurysta_id;
    const response = await fetch(process.env.REACT_APP_BASE_API_URL + "opera/jurist/" + id)

    if (!response.ok) {
        throw json(
            {message: 'Nie udało załadować się spisu prac'},
            {status: 500}
        )
    } else {
        const data = await response.json()
        return data
    }
}