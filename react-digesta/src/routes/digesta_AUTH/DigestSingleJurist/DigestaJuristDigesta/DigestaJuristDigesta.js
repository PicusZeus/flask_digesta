import {json, useLoaderData, useParams} from "react-router-dom";
import DigestaToc from "../../../../components/DigestaToc/DigestaToc";




const DigestaJuristDigesta = () => {
    const toc = useLoaderData()

    return (
        <>
        <div>Jurysta wg układu digesta</div>
        <DigestaToc toc={toc}/>
    </>
    )
}

export default DigestaJuristDigesta



const prepareToc = (id, toc) => {
    const _id = id
    console.log(_id, 'ID')
    const newToc = {
        ...toc,
        "tituli": []
    }
    for (const titulus_ind in toc.tituli) {
        const newTitulus = {...toc.tituli[titulus_ind], 'leges': []}
        const newLeges = toc.tituli[titulus_ind].leges.filter((lex) => {
            // console.log(lex.author_id, _id, lex.author_id === id)
            return lex.author_id === _id
        })
        console.log()
        if (newLeges.length > 0) {
            newTitulus.leges = newLeges
            newToc.tituli.push(newTitulus)
        }
    }
    return newToc
}

export const loader = async ({ params, request}) => {
    const id = parseInt(params.jurysta_id);
    const response = await fetch("http://127.0.0.1:5001/digesta/book/1");

    if (!response.ok) {
        throw json(
            {message: 'could not load'},
            {status: 500}
        )

    } else {
        const data = await response.json()


        return prepareToc(id, data)

    }
}