import {json, Link, useLoaderData} from "react-router-dom";

const DigestaLexViewer = (props) => {

    let lex = useLoaderData()
    if (!lex) {lex = props.lex}


    const linkAuthor = "http://127.0.0.1:3000/jurysci/" + lex.author.id
    const linkOpus = 'http://127.0.0.1:3000/jurysci/' + lex.author.id + '/opera/' + lex.opus.id
    return (
        <section>
            {lex &&
                <div>
                    <Link to={linkAuthor}>{lex.author.name}</Link>
                    <Link to={linkOpus}>{lex.opus.book} {lex.opus.title_pl}</Link>
                    <p> {lex.text_lat}</p>
                    <p> {lex.text_pl}</p>
                </div>
            }
        </section>

    )
}
export default DigestaLexViewer


export const loader = async ({params, request}) => {
    const id = params.lex_id
    const response = await fetch("http://127.0.0.1:5001/digesta/leges/" + id)

    if (!response.ok) {
        throw json(
            {message: 'I messed up'},
            {status: 500}
        )
    } else {
        const data = await response.json()
        return data
    }
}