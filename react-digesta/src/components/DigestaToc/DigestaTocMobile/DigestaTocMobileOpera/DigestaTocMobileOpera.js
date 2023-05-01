import classes from "./DigestaTocMobileOpera.module.css"
import DigestaTocMobileOpus from "../DigestaTocMobileOpus/DigestaTocMobileOpus";
import {useState} from "react";

const DigestaTocMobileOpera = (props) => {
    const toc = props.toc
    const [chosenOpus, setChosenOpus] = useState(null)
    const onOptionChangeHandler = (event) => {

        setChosenOpus(parseInt(event.target.value))

    }
    return (
        <>
            <label className={classes.main_toc__label}>WYBIERZ DZIEŁO</label>
            <select className={classes.main_toc__opera_option} onChange={onOptionChangeHandler}>
                <option value={''}>Wybierz dzieło</option>
                {toc && toc.map(opus => {return (<option key={opus.id} value={opus.id}>{opus.book} {opus.title_lat} {opus.author.name}</option>)})}

            </select>
            {chosenOpus && <DigestaTocMobileOpus content={toc.filter((opus)=>{ return (opus.id === chosenOpus)})[0]}/>}

        </>
    )
}

export default DigestaTocMobileOpera