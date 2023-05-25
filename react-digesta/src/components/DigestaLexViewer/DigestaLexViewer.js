import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import classes from "./DigestaLexViewer.module.css"
import DigestaParagraphusViewer from "../DigestaParagraphusViewer/DigestaParagraphusViewer";
import DigestaTocMobileParagraphi
    from "../DigestaToc/DigestaTocMobile/DigestaTocMobileParagraphi/DigestaTocMobileParagraphi";
import {useQuery} from "@tanstack/react-query";
import Spinner from "../UI/spinner/Spinner";
import {digestaActions} from "../../store/digesta-slice";
import {useDispatch} from "react-redux";
import {getLex} from "../../api/api";
import {uiActions} from "../../store/ui-slice";
import {useEffect} from "react";


const getLexQuery = (id) => {
    return {
        queryKey: ["digesta", "leges", id],
        queryFn: () => getLex(id)
    }
}

const DigestaLexViewer = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const params = useParams()
    const {data: lex, isFetching} = useQuery(getLexQuery(params.lex_id))
    // useEffect(()=>{
    //     if (lex && lex.paragraphi.length > 1 && !params.paragraphus_id) {
    //         console.log(lex.paragraphi)
    //         const paragraphus_id = lex.paragraphi[0].id
    //         navigate(`/digesta/${params.lex_id}/${paragraphus_id}`)
    //     }
    // })


    if (isFetching) {
        return <Spinner/>
    }


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
    const ksiega = "Liber " + lex.opus.liber.toString()
    const address = "D " + lex.titulus.book.book_nr + '.' + lex.titulus.number + '.' + lex.lex_nr
    const address_lat = lex.address_lat
    // const address_pl = lex.address_pl


    const paragraphiDic = Object.assign({}, ...paragraphi.map((paragraphus) => ({[paragraphus.key]: paragraphus})));
    const paragraphiKeys = Object.keys(paragraphiDic).sort((a, b) => parseInt(a) - parseInt(b))
    paragraphiKeys.unshift(paragraphiKeys.pop())

    const showOpusHandler = () => {
        dispatch(uiActions.setActiveSection("juristsNav"))
        dispatch(digestaActions.setChosenJuristId(lex.author.id))
        dispatch(digestaActions.setChosenOpusId(lex.opus.opus.id))
        dispatch(digestaActions.setChosenOpusLiberId(lex.opus.id))
        // dispatch()
    }
    console.log(paragraphiDic)


    console.log(paragraphiKeys, params.paragraphus_id, paragraphi)

    let nextUrl = `/digesta/${parseInt(params.lex_id) + 1}`
    let previousUrl = `/digesta/${parseInt(params.lex_id) -1}`
    if (params.lex_id == 1 ) { previousUrl = ''}
    if (params.lex_id == 9142) { nextUrl = ''}
    if (paragraphi) {
        if (params.paragraphus_id)
        {const par_id = parseInt(params.paragraphus_id)
        const previous = paragraphi.filter(p=>p.id === par_id - 1)
        if (previous.length === 1) {
            previousUrl = `/digesta/${parseInt(params.lex_id)}/${par_id -1}`
        }
        const next = paragraphi.filter(p=>p.id === par_id + 1)
        if (next.length === 1) {
            nextUrl = `/digesta/${parseInt(params.lex_id)}/${par_id +1}`
        }}
        else if (paragraphi.length > 1) {

           nextUrl = `/digesta/${parseInt(params.lex_id)}/${paragraphi[0].id}`
        }

    }




    return (

        <section className={classes.main_lex}>

            <div className={classes.main_lex__next}>
                <div className={classes.main_lex__next_redirection}>
                    <Link to={previousUrl}>
                        <span className="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                    </Link>


                </div>

                <div className={classes.main_lex__title}>
                    <h1>{address}</h1>
                    <h4>{address_lat}</h4>
                    {/*<h4>{address_pl}</h4>*/}


                </div>
                <div className={classes.main_lex__next_redirection}>
                    <Link to={nextUrl}>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </Link>
                </div>

            </div>

            <div className={classes.main_lex__redirections}>
                <button onClick={() => {
                    dispatch(uiActions.setActiveSection("juristsNav"))
                }}><Link to={linkAuthor}>{lex.author.name}</Link></button>
                <button onClick={showOpusHandler}><Link
                    to={linkToAuthorOpera}><span>{parseInt(lex.opus.liber) > 0 ? ksiega : null}</span><span> {lex.opus.opus.title_lat}</span></Link>
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