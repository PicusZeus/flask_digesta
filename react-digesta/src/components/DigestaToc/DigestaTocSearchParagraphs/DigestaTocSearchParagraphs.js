import DigestaSearchViewer from "../../DigestaSearchViewer/DigestaSearchViewer";
const DigestaTocSearchParagraphs = (props) => {
    let results

    results = props.paragraphi.map(paragraphus=>(<DigestaSearchViewer paragraph={paragraphus} searchedTerm={props.searchedTerm} lang={props.lang}/>))
    return (
        <>
        <div>links leges</div>
            <ul>
                <h1>{props.searchedTerm}</h1>
                {results}
            </ul>

        </>

    )
}

export default DigestaTocSearchParagraphs