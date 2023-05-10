import TocMobile from "../../../UI/TocMobile/TocMobile";


const DigestaTocMobileParagraphi = ({setParagraph, paragraphiKeys}) => {
    const paragraphi = paragraphiKeys.slice(1)
    let options
    options = paragraphi.map((p) => (<option key={p}>{p}</option>))

    return (
        <>

            <TocMobile onOption={setParagraph}>
                <option value="">Wybierz Paragraf</option>
                 {options}
            </TocMobile>


        </>
    )
}

export default DigestaTocMobileParagraphi
