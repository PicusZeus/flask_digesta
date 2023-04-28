import classes from "./DigestaTocLex.module.css";


const DigestaTocParagraphi = (props) => {
    const paragraphi = props.paragraphiKeys.slice(1)
    let options
    options = paragraphi.map((p) => (<option key={p}>{p}</option>))

    return (
        <>
            <label className={classes.main_toc__label}>Wybierz Paragraf</label>

            <select className={classes.main_toc__paragraphus_option} onChange={props.setParagraph}>
                <option value={''}>Wybierz paragraph</option>
                {options}

            </select>
        </>
    )
}

export default DigestaTocParagraphi
