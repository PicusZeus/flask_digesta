import DigestaSearchViewer from "../../DigestaSearchViewer/DigestaSearchViewer";

const DigestaTocSearchParagraphs = (props) => {
    let results

    results = props.paragraphi.map(paragraphus => (
        <DigestaSearchViewer paragraph={paragraphus} searchedTerm={props.searchedTerm} lang={props.lang}/>))
    return (
        <ul>
            <h1>Szukany termin <b>{props.searchedTerm}</b> występuje w następujących ustawach</h1>
            {results}
        </ul>


    )
}

export default DigestaTocSearchParagraphs