import classes from "./DigestaTocOpera.module.css"
import DigestaTocBook from "../DigestaTocBooks/DigestaTocBook/DigestaTocBook";
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
                <option key={666666} value={null}>Wybierz księgę</option>
                {toc && toc.map(opus => {return (<option key={opus.id} value={opus.id}>{opus.book} {opus.title_lat} {opus.author.name}</option>)})}

            </select>
            {/*{chosenOpus && <DigestaTocBook content={toc.filter((book) => {*/}
            {/*    return (book.id === chosenOpus)*/}

        </>
    )
}

export default DigestaTocOpera