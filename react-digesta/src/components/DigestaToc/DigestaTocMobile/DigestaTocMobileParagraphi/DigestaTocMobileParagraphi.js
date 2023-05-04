import classes from "./DigestaTocMobileParagraphi.module.css";
import TocMobile from "../../../UI/TocMobile/TocMobile";


const DigestaTocMobileParagraphi = (props) => {
    const paragraphi = props.paragraphiKeys.slice(1)
    let options
    options = paragraphi.map((p) => (<option key={p}>{p}</option>))

    return (
        <>

            <TocMobile onOption={props.setParagraph}>
                <option value="">Wybierz Paragraf</option>
                 {options}
            </TocMobile>


        </>
    )
}

export default DigestaTocMobileParagraphi
