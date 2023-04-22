import {useState} from "react";
import DigestaLexViewer from "../../DigestaLexViewer/DigestaLexViewer";
import DigestaParagraphusViewer from "../../DigestaParagraphusViewer/DigestaParagraphusViewer";
const DigestaTocSearchLeges = (props) => {

    const [chosenParagraph, setChosenParagraph] = useState(null)
    let toc

    toc = props.paragraphi.map(paragraph=>{return <li><button onClick={()=>setChosenParagraph(paragraph)}>księga {paragraph.lex.titulus.book.id}
                                                tytuł {paragraph.lex.titulus.number}
                                                ustawa {paragraph.lex.lex_nr}
                                                paragraf {paragraph.key} </button></li>})
    console.log(chosenParagraph, 'chosen')
    return (
        <>
        <div>links leges</div>
            <ul>
                {toc}
            </ul>

            {chosenParagraph && <DigestaParagraphusViewer paragraphus={chosenParagraph}/>}
        </>

    )
}

export default DigestaTocSearchLeges