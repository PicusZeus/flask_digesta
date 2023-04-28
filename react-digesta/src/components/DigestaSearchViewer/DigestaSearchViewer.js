import {useState} from "react";
import {Link} from "react-router-dom";
const DigestaSearchViewer = ({paragraph, searchedTerm, lang}) => {
    const [showResult, setShowResult] = useState(false)

    let keyLang = 'text_lat'
    let keyTrLang = 'text_pl'
    if (lang !== 'lat') {
        keyLang = 'text_pl'
        keyTrLang = 'text_lat'
    }
    const text = paragraph[keyLang]
    const re = new RegExp(searchedTerm, 'g')

    const result = text.split(re)
    const res = []
    for (let i = 0; i < result.length; i++) {
        if (i < result.length - 1) {
            res.push(<>{result[i]}</>)
            res.push(<b>{searchedTerm}</b>)
        } else {
            res.push(<>{result[i]}</>)
        }
    }
    const url = '/digesta/' + paragraph.lex.id

    return (
        <>
            <li>
                <button
                    onClick={() => setShowResult(!showResult)}>
                    D {paragraph.lex.titulus.book.book_nr}.{paragraph.lex.titulus.number}.{paragraph.lex.lex_nr}.{paragraph.key}
                </button>
                {showResult && <div>{res}</div>}
                {showResult && <div>{paragraph[keyTrLang]}</div>}
                <Link to={url}>do Digestów</Link>

            </li>

        </>
    )
}
export default DigestaSearchViewer