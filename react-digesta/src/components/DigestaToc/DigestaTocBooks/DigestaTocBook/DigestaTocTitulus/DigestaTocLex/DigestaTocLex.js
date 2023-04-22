import classes from "./DigestaTocLex.module.css";
import {useNavigate} from "react-router-dom";


const DigestaTocLex = (props) => {
    // console.log(props, 'inside')
    const navigate = useNavigate()
    const onOptionChangeHandler = (event) => {
        const paragraphus_key = event.target.value
        console.log(event.target)
        props.setParagraph(paragraphus_key)
        // navigate(paragraphus_id.toString())
    }
    const paragraphi_keys_sorted = Object.keys(props.paragraphi).sort((a, b)=>{return (parseInt(a) - parseInt(b))})
    paragraphi_keys_sorted.unshift(paragraphi_keys_sorted.pop())
    // let paragraphi
    // if (props.paragraphi)
    //     paragraphi = props.paragraphi.paragraphi
    // console.log(paragraphi, 'prar')
    const options = paragraphi_keys_sorted.map(key=>{
        return (
            <option key={key} value={key}>{key}</option>
        )
    })

    return (
        <>
            <label className={classes.main_toc__label}>Wybierz Paragraf</label>

            <select className={classes.main_toc__paragraphus_option} onChange={onOptionChangeHandler}>
                <option value={''}>Wybierz paragraph</option>
                {/*<option value={praephatio.id}>{praephatio.key}</option>*/}
                {options}
            </select>
        </>
    )
}

export default DigestaTocLex