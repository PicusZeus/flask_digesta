import {json, Link, Outlet, useLoaderData, useNavigate} from "react-router-dom";
import classes from "./DigestaLexViewer.module.css"
import DigestaParagraphusViewer from "../DigestaParagraphusViewer/DigestaParagraphusViewer";
import DigestaTocParagraphi
    from "../DigestaToc/DigestaTocBooks/DigestaTocBook/DigestaTocTitulus/DigestaTocParagraphi/DigestaTocParagraphi";
import {useEffect} from "react";
import {refreshToken} from "../../store/auth-actions";
import {useDispatch} from "react-redux";


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

    const linkAuthor = "/juryci/" + lex.author.id
    const linkOpus = '/opera/' + lex.opus.id
    const ksiega = "Księga " + lex.opus.book
    const address = "D " + lex.titulus.book.book_nr + '.' + lex.titulus.number + '.' + lex.lex_nr
    const address_lat = lex.address_lat
    const address_pl = lex.address_pl


    const paragraphiDic = Object.assign({}, ...paragraphi.map((paragraphus) => ({[paragraphus.key]: paragraphus})));
    const paragraphiKeys = Object.keys(paragraphiDic).sort((a, b) => parseInt(a) - parseInt(b))
    paragraphiKeys.unshift(paragraphiKeys.pop())

    useEffect(() => {

    }, [])

    return (

        <section className={classes.main_lex}>

            <div className={classes.main_lex__text}>
                <h1>{address}</h1>
                <h5>{address_lat}</h5>
                <h5>{address_pl}</h5>


            </div>
            <div className={classes.main_lex__redirections}>
                <Link to={linkAuthor}>{lex.author.name}</Link>
                <Link to={linkOpus}>{parseInt(lex.opus.book) > 0 ? ksiega : null} {lex.opus.title_pl}</Link>
            </div>
            <DigestaParagraphusViewer paragraphus={paragraphiDic['pr']}/>
            {paragraphiKeys.length > 1 &&
                <DigestaTocParagraphi setParagraph={setParagraphHandler} paragraphiKeys={paragraphiKeys}/>}

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
