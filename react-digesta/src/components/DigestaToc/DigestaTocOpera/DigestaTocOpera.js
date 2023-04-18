import classes from "./DigestaTocOpera.module.css"
import DigestaTocOpus from "./DigestaTocOpus/DigestaTocOpus";
import {useState} from "react";

const DigestaTocOpera = (props) => {
    const toc = props.toc
    const [chosenOpus, setChosenOpus] = useState(null)
    const onOptionChangeHandler = (event) => {

        setChosenOpus(parseInt(event.target.value))

    }

    return (
        <>
            <label className={classes.main_toc__label}>Wybierz dzieło</label>
            <select className={classes.main_toc__opera_option} onChange={onOptionChangeHandler}>
                <option key={666666} value={null}>Wybierz dzieło</option>
                {toc && toc.map(opus => {return (<option key={opus.id} value={opus.id}>{opus.book} {opus.title_lat} {opus.author.name}</option>)})}

            </select>
            {chosenOpus && <DigestaTocOpus content={toc.filter((opus)=>{ return (opus.id === chosenOpus)})[0]}/>}
            {/*{chosenOpus && <DigestaTocBook content={toc.filter((book) => {*/}
            {/*    return (book.id === chosenOpus)*/}

        </>
    )
}

export default DigestaTocOpera