import {useLoaderData} from "react-router-dom";
import {json} from "react-router-dom";

const DigestaParagraphusViewer = (props) => {

    let paragraphus = useLoaderData()
    if (props.paragraphus) {
        paragraphus = props.paragraphus
    }
    console.log()
    return (
        <>
            <div>Paragraf</div>
            <div>{paragraphus.text_lat}</div>
        </>

    )
}
export default DigestaParagraphusViewer

export const loader = async ({params, request}) => {
    const id = params.paragraphus_id
    const response = await fetch("http://127.0.0.1:5001/digesta/paragraphi/" + id)

    if (!response.ok) {
        throw json(
            {message: 'I messed up even more'},
            {status: 500}
        )
    } else {
        const data = await response.json()
        return data
    }
}