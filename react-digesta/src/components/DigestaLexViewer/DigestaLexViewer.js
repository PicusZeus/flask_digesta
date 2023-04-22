import {json, Link, useLoaderData} from "react-router-dom";
import classes from "./DigestaLexViewer.module.css"
import Posts from "../Posts/Posts";
import DigestaParagraphusViewer from "../DigestaParagraphusViewer/DigestaParagraphusViewer";
import DigestaTocLex from "../DigestaToc/DigestaTocBooks/DigestaTocBook/DigestaTocTitulus/DigestaTocLex/DigestaTocLex";
import {useEffect, useState} from "react";


const DigestaLexViewer = (props) => {
    const [chosenParagraphus, setChosenParagraphus] = useState(null)
    let lex = useLoaderData()
    if (!lex) {
        lex = props.lex
    }
    useEffect(()=>{
        setChosenParagraphus(null)
    }, [lex])
    console.log(lex, 'in lex')

    const linkAuthor = "http://127.0.0.1:3000/jurysci/" + lex.author.id
    const linkOpus = 'http://127.0.0.1:3000/jurysci/' + lex.author.id + '/opera/' + lex.opus.id
    const ksiega = "Księga " + lex.opus.book
    const address = "D " + lex.titulus.book.book_nr + '.' + lex.titulus.number + '.' + lex.lex_nr
    const address_lat = lex.address_lat
    const address_pl = lex.address_pl
    let paragraphi = Object.assign({}, ...lex.paragraphi.map((paragraphus) => ({[paragraphus.key]: paragraphus})));
    const praephatio = {...paragraphi['pr']}
    console.log(Object.keys(paragraphi).length)
    const number_of_paragraphs = Object.keys(paragraphi).length
    // delete paragraphi['pr']
    return (
        <section className={classes.main_lex}>
            <div className={classes.main_lex__text}>
                <h1>{address}</h1>
                <h5>{address_lat}</h5>
                {/*<p> {lex.text_lat}</p>*/}
                <h5>{address_pl}</h5>
                {number_of_paragraphs === 1 && <DigestaParagraphusViewer paragraphus={praephatio}/>}

                {/*<p> {lex.text_pl}</p>*/}
                {/*<DigestaParagraphusViewer paragraphus={praefatio}/>*/}
                {number_of_paragraphs > 1 && <DigestaTocLex paragraphi={paragraphi} setParagraph={setChosenParagraphus}/>}
                {chosenParagraphus && (
                    <div>
                        <label>{chosenParagraphus}</label>
                        <DigestaParagraphusViewer paragraphus={paragraphi[chosenParagraphus]} />
                    </div>)
                }}


            </div>
            <div className={classes.main_lex__redirections}>
                <Link to={linkAuthor}>{lex.author.name}</Link>
                <Link to={linkOpus}>{parseInt(lex.opus.book) > 0 ? ksiega : null} {lex.opus.title_pl}</Link>
            </div>

            {/*<Posts posts={lex.comments}/>*/}
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