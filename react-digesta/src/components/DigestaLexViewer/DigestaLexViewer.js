import {json, Link, useLoaderData} from "react-router-dom";
import classes from "./DigestaLexViewer.module.css"


const DigestaLexViewer = (props) => {

    let lex = useLoaderData()
    if (!lex) {lex = props.lex}

    console.log(lex)
    const linkAuthor = "http://127.0.0.1:3000/jurysci/" + lex.author.id
    const linkOpus = 'http://127.0.0.1:3000/jurysci/' + lex.author.id + '/opera/' + lex.opus.id
    const ksiega = "Księga " + lex.opus.book
    const address = "D " + lex.book.book_nr + '.' + lex.titulus.number + '.' + lex.lex_nr
    const address_lat = lex.address_lat
    const address_pl = lex.address_pl

    return (
        <section className={classes.main_lex}>
            {lex &&
                <>

                    <div className={classes.main_lex__text}>
                        <h1>{address}</h1>
                        <h5>{address_lat}</h5>
                        <p> {lex.text_lat}</p>
                        <h5>{address_pl}</h5>
                        <p> {lex.text_pl}</p>

                    </div>
                    <div className={classes.main_lex__redirections}>
                        <Link to={linkAuthor}>{lex.author.name}</Link>
                        <Link to={linkOpus}>{parseInt(lex.opus.book) > 0 ? ksiega : null} {lex.opus.title_pl}</Link>
                    </div>
                </>
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