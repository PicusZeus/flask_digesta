import {json, Link, Outlet, useLoaderData} from "react-router-dom";
import DigestaTocOpera from "../../../components/DigestaToc/DigestaTocOpera/DigestaTocOpera";


const DigestaJuristOpera = () => {
    const toc = useLoaderData()
    console.log(toc, "JURISTR")
    return (
        <div >
            <div>opera</div>

            <DigestaTocOpera toc={toc}/>
            {/*<ul>*/}
            {/*    {opera && opera.map((opus) => {*/}
            {/*        return (*/}
            {/*            */}
            {/*            <li>*/}
            {/*                <Link to={opus.id.toString()}>*/}
            {/*                    {opus.book} {opus.title_lat}*/}
            {/*                </Link>*/}
            {/*            </li>*/}

            {/*        )*/}
            {/*    })}*/}

            {/*</ul>*/}
            <Outlet/>

        </div>

    )
}

export default DigestaJuristOpera

export const loader = async ({params, request}) => {
    const id = params.jurysta_id;
    const response = await fetch("http://127.0.0.1:5001/opera/jurist/" + id)

    if (!response.ok) {
        throw json(
            {message: 'couldnt do it'},
            {status: 500}
        )
    } else {
        const data = await response.json()
        return data
    }
}