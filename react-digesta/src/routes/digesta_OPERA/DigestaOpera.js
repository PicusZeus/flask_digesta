import {json, Outlet, useLoaderData} from "react-router-dom";
import DigestaTocOpera from "../../components/DigestaToc/DigestaTocOpera/DigestaTocOpera";


const DigestaOpera = () => {
    const toc = useLoaderData()

    return (
        <>
            <div>Prace cytowane w Digestach</div>
            <DigestaTocOpera toc={toc}/>
            <Outlet/>

        </>

    )


}

export default DigestaOpera


export const loader = async () => {

    const response = await fetch("http://127.0.0.1:5001/opera")
    if (!response.ok) {
        throw json(
            {message: 'could not load'},
            {status: 500}
        )

    } else {
        const data = await response.json()


        return data
    }
}