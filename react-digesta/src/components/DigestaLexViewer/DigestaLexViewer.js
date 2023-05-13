import {json, Link, Outlet, useLoaderData, useNavigate, useParams} from "react-router-dom";
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
            console.log('response', response.data)
            return response.data})

    // return api.get(`authors/${id}`).then((response)=> {
    //     return response.data
    // }).catch(()=>{
    //     throw json(
    //        {message: 'Nie udało się załadować danych dla tego jurysty'},
    //         {status: 500}
    //     )
    // })


}
//
const getLexQuery = (id) => {
    // const lId = parseInt(id)
    return {
        queryKey: ["jurist", id],
        queryFn: () => getLex(id)
    }
}

const DigestaLexViewer = (props) => {

    const params = useParams()
    console.log(params.lex_id)
    const { status, isLoading, data: lex } = useQuery(getLexQuery(params.lex_id))
    console.log(lex, "LEX", status, isLoading)

    // let lex = useLoaderData()

   const navigate = useNavigate()
  // if (isLoading)
  //   {return <Spinner/>}
    // if (!lex) {
    //    const { data } = getLexQuery(params.lex_id)
    //     lex = data
    // }

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
    // const address = 'to do'
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


// export const loader = async ({params}) => {
//
//     const id = params.lex_id
//     const response = await fetch(process.env.REACT_APP_BASE_API_URL + "digesta/leges/" + id)
//
//     if (!response.ok) {
//         throw json(
//             {message: 'Błąd serwera'},
//             {status: 500}
//         )
//     } else {
//         const data = await response.json()
//         return data
//     }
// }


export const loader = (queryClient) => async ({params}) => {
    const query = getLexQuery(params.lex_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}