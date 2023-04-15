import {json, useLoaderData} from "react-router-dom";


const DigestaJuristOpusLex = () => {
    const lex = useLoaderData()
    return (
        <>
            <div>lex content</div>
            <p>{lex.text_lat}</p>
        </>

    )
}

export default DigestaJuristOpusLex


export const loader = async ({ params, request }) => {
    const id = params.lex_id
    const response = await fetch("http://127.0.0.1:5001/digesta/leges/" + id, {
        method: request.method
    });

    if (!response.ok) {
        throw json(
            {message: "could not load"},
            { status: 500 }
        );
    } else {
        const data = await response
        return data.json()
    }
}