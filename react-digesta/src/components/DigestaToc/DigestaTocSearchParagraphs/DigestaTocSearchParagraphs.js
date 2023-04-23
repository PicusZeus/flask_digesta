import {useState} from "react";
import DigestaLexViewer from "../../DigestaLexViewer/DigestaLexViewer";
import DigestaParagraphusViewer from "../../DigestaParagraphusViewer/DigestaParagraphusViewer";
import DigestaSearchViewer from "../../DigestaSearchViewer/DigestaSearchViewer";
const DigestaTocSearchParagraphs = (props) => {
    console.log(props.lang, 'language')
    const [chosenParagraph, setChosenParagraph] = useState(null)
    let results

    // toc = props.paragraphi.map(paragraph=>{return <li><button onClick={()=>setChosenParagraph(paragraph)}>księga {paragraph.lex.titulus.book.id}
    //                                             tytuł {paragraph.lex.titulus.number}
    //                                             ustawa {paragraph.lex.lex_nr}
    //                                             paragraf {paragraph.key} </button></li>})
    // console.log(chosenParagraph, 'chosen')
    results = props.paragraphi.map(paragraphus=>(<DigestaSearchViewer paragraph={paragraphus} searchedTerm={props.searchedTerm} lang={props.lang}/>))
    return (
        <>
        <div>links leges</div>
            <ul>
                <h1>{props.searchedTerm}</h1>
                {results}
            </ul>

            {/*{chosenParagraph && <DigestaParagraphusViewer paragraphus={chosenParagraph}/>}*/}
        </>

    )
}

export default DigestaTocSearchParagraphs