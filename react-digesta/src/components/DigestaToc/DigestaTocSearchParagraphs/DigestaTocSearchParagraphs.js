import DigestaSearchViewer from "../../DigestaSearchViewer/DigestaSearchViewer";
import classes from "./DigestaTocSearchParagraphs.module.css";

const DigestaTocSearchParagraphs = (props) => {
    let results

    results = props.paragraphi.map(paragraphus => (
        <DigestaSearchViewer key={paragraphus.id} paragraph={paragraphus} searchedTerm={props.searchedTerm} lang={props.lang}/>))
    return (
        <ul className={classes.found_items}>
            <h1>Szukany termin <span>{props.searchedTerm}</span> występuje w następujących ustawach</h1>
            {results}
        </ul>


    )
}

export default DigestaTocSearchParagraphs