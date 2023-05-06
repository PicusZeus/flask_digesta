import {useState} from "react";
import {Link} from "react-router-dom";
import classes from "./DigestaSearchViewer.module.css"
const DigestaSearchViewer = ({paragraph, searchedTerm, lang}) => {
    const [showResult, setShowResult] = useState(false)

    let keyLang = 'text_lat'
    let keyTrLang = 'text_pl'
    if (lang !== 'lat') {
        keyLang = 'text_pl'
        keyTrLang = 'text_lat'
    }
    const text = paragraph[keyLang]
    const re = new RegExp(searchedTerm, 'ig')

    const result = text.split(re)
    const res = []
    for (let i = 0; i < result.length; i++) {
        if (i < result.length - 1) {
            res.push(<>{result[i]}</>)
            res.push(<b className={classes.found_item__match}>{searchedTerm.toUpperCase()}</b>)
        } else {
            res.push(<>{result[i]}</>)
        }
    }

    const buttonClasses = [classes.found_item__button]
    if (showResult) {buttonClasses.push(classes.selected)}
    let url = '/digesta/' + paragraph.lex.id
    if (paragraph.key !== "pr") {
        url = `/digesta/${paragraph.lex.id}/${paragraph.id}`
    }

    return (
            <li className={classes.found_item}>
                <button className={buttonClasses.join(" ")}
                    onClick={() => setShowResult(!showResult)}>
                    D {paragraph.lex.titulus.book.book_nr}.{paragraph.lex.titulus.number}.{paragraph.lex.lex_nr}.{paragraph.key}
                </button>
                <div className={classes.found_item__texts}>
                    {showResult && <div className={classes.found_item__text}>{res}</div>}
                    {showResult && <div className={classes.found_item__text}>{paragraph[keyTrLang]}</div>}

                </div>

                {showResult && <button className={classes.found_item__redirect}><Link to={url}>Przejdź do układu Digestów</Link></button>}

            </li>


    )
}
export default DigestaSearchViewer