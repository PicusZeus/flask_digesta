import DigestaSearchViewer from "../../DigestaSearchViewer/DigestaSearchViewer";
import classes from "./DigestaTocSearchParagraphs.module.css";
import {useState} from "react";

const DigestaTocSearchParagraphs = ({paragraphi, searchedTerm, lang}) => {
    // let results
    const [paragraphiSorted, setParagraphiSorted] = useState(false)

    const sortByAuthorHandler = () => {
        const sorted = [...paragraphi]
        sorted.sort((a, b) => (
        a.lex.author.name.localeCompare(b.lex.author.name)
    ));
        setParagraphiSorted(sorted)
    }

    const sortByDigestaHandler = () => {
        setParagraphiSorted(paragraphi)
    }
    let paragraphs = paragraphi
    if (paragraphiSorted) {paragraphs = paragraphiSorted}

    const results = paragraphs.map(paragraphus => (
        <DigestaSearchViewer key={paragraphus.id} paragraph={paragraphus} searchedTerm={searchedTerm} lang={lang}/>))
    return (
        <>
            <button onClick={sortByAuthorHandler}>Posortuj według jurystów</button>
            <button onClick={sortByDigestaHandler}>Posortuj według układu Digestów</button>
        <ul className={classes.found_items}>
            <h1>Szukany termin <span>{searchedTerm}</span> występuje w następujących ustawach</h1>
            {results}
        </ul>
        </>

    )
}

export default DigestaTocSearchParagraphs