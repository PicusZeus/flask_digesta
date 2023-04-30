import {json, Link, Outlet, useLoaderData, useNavigate} from "react-router-dom";
import classes from "./DigestaLexViewer.module.css"
import DigestaParagraphusViewer from "../DigestaParagraphusViewer/DigestaParagraphusViewer";
import DigestaTocMobileParagraphi
    from "../DigestaToc/DigestaTocMobile/DigestaTocMobileParagraphi/DigestaTocMobileParagraphi";
import {useEffect} from "react";



const DigestaLexViewer = (props) => {
    const navigate = useNavigate()
    let lex = useLoaderData()
    if (!lex) {
        lex = props.lex
    }
    const paragraphi = lex.paragraphi
    const setParagraphHandler = (event) => {
        const paragraphKey = event.target.value
        const paragraphId = paragraphi.filter(p => (p.key === paragraphKey))[0]
        if (paragraphId) {
            navigate(paragraphId.id.toString())
        }
    }

    const linkAuthor = "/jurysci/" + lex.author.id
    const linkOpus = '/opera/' + lex.opus.id
    const ksiega = "Księga " + lex.opus.book
    const address = "D " + lex.titulus.book.book_nr + '.' + lex.titulus.number + '.' + lex.lex_nr
    const address_lat = lex.address_lat
    const address_pl = lex.address_pl


    const paragraphiDic = Object.assign({}, ...paragraphi.map((paragraphus) => ({[paragraphus.key]: paragraphus})));
    const paragraphiKeys = Object.keys(paragraphiDic).sort((a, b) => parseInt(a) - parseInt(b))
    paragraphiKeys.unshift(paragraphiKeys.pop())



    return (

        <section className={classes.main_lex}>

            <div className={classes.main_lex__title}>
                <h1>{address}</h1>
                <h4>{address_lat}</h4>
                <h4>{address_pl}</h4>


            </div>
            <div className={classes.main_lex__redirections}>
                <button><Link to={linkAuthor}>{lex.author.name}</Link></button>
                <button><Link to={linkOpus}><span>{parseInt(lex.opus.book) > 0 ? ksiega : null}</span><span> {lex.opus.title_pl}</span></Link></button>
            </div>
            <DigestaParagraphusViewer paragraphus={paragraphiDic['pr']}/>
            {paragraphiKeys.length > 1 &&
                <DigestaTocMobileParagraphi setParagraph={setParagraphHandler} paragraphiKeys={paragraphiKeys}/>}

            <Outlet/>
        </section>

    )
}
export default DigestaLexViewer


export const loader = async ({params, request}) => {
    const id = params.lex_id
    const response = await fetch(process.env.REACT_APP_BASE_API_URL + "digesta/leges/" + id)

    if (!response.ok) {
        throw json(
            {message: 'Błąd serwera'},
            {status: 500}
        )
    } else {
        const data = await response.json()
        return data
    }
}
