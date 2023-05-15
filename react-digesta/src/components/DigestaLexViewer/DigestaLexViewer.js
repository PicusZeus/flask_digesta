import {json, Link, Outlet, useNavigate, useParams} from "react-router-dom";
import classes from "./DigestaLexViewer.module.css"
import DigestaParagraphusViewer from "../DigestaParagraphusViewer/DigestaParagraphusViewer";
import DigestaTocMobileParagraphi
    from "../DigestaToc/DigestaTocMobile/DigestaTocMobileParagraphi/DigestaTocMobileParagraphi";
import api from "../../api/api";
import {useQuery} from "@tanstack/react-query";
import Spinner from "../UI/spinner/Spinner";

const getLex = (id) => {
    return api.get("digesta/leges/" + id)
        .then(response=>{
            return response.data}).catch(()=>{
                throw json(
                    {message: "Nie udało się załadować danych dla tej ustawy"},
                    {status: 500}
                )
        })

}
const getLexQuery = (id) => {
    return {
        queryKey: ["digesta", "leges", id],
        queryFn: () => getLex(id)
    }
}

const DigestaLexViewer = () => {

    const params = useParams()
    const { data: lex } = useQuery(getLexQuery(params.lex_id))


   const navigate = useNavigate()


    const paragraphi = lex.paragraphi
    const setParagraphHandler = (event) => {
        const paragraphKey = event.target.value
        const paragraphId = paragraphi.filter(p => (p.key === paragraphKey))[0]
        if (paragraphId) {
            navigate(paragraphId.id.toString())
        }
    }
    const linkToAuthorOpera = `/jurysci/${lex.author.id}/opera/${lex.author.id}`
    const linkAuthor = "/jurysci/" + lex.author.id
    const ksiega = "Księga " + lex.opus.liber.toString()
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
                <button><Link
                    to={linkToAuthorOpera}><span>{parseInt(lex.opus.liber) > 0 ? ksiega : null}</span><span> {lex.opus.opus.title_pl}</span></Link>
                </button>
            </div>
            <DigestaParagraphusViewer paragraphus={paragraphiDic['pr']}/>
            {paragraphiKeys.length > 1 &&
                <div className={classes.main_lex__mobile_toc}><DigestaTocMobileParagraphi
                    setParagraph={setParagraphHandler} paragraphiKeys={paragraphiKeys}/></div>}

            <Outlet/>
        </section>

    )
}
export default DigestaLexViewer




export const loader = (queryClient) => async ({params}) => {
    const query = getLexQuery(params.lex_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}