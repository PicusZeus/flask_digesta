import classes from "./DigestaTocMobileParagraphi.module.css";
import TocMobile from "../../../UI/TocMobile/TocMobile";


const DigestaTocMobileParagraphi = (props) => {
    const paragraphi = props.paragraphiKeys.slice(1)
    let options
    options = paragraphi.map((p) => (<option key={p}>{p}</option>))

    return (
        <>
            <label className={classes.main_toc__label}>Wybierz Paragraf</label>

            <TocMobile onOption={props.setParagraph}>

                 {options}
            </TocMobile>


        </>
    )
}

export default DigestaTocMobileParagraphi
