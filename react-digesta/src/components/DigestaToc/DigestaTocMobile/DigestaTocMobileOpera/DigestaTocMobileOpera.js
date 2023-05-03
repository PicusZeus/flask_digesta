import classes from "./DigestaTocMobileOpera.module.css"
import DigestaTocMobileOpus from "../DigestaTocMobileOpus/DigestaTocMobileOpus";
import {useState} from "react";
import TocMobile from "../../../UI/TocMobile/TocMobile";

const DigestaTocMobileOpera = (props) => {
    const toc = props.toc
    const [chosenOpus, setChosenOpus] = useState(false)
    const onOptionChangeHandler = (event) => {

        setChosenOpus(parseInt(event.target.value))

    }
    return (
        <>
            <TocMobile onOption={onOptionChangeHandler}>

                <option value={''}>Wybierz dzieło</option>
                {toc && toc.map(opus => {return (<option key={opus.id} value={opus.id}>Księga {opus.book} {
                    opus.title_lat.toUpperCase()}</option>)})}

            </TocMobile>
            {chosenOpus ? <DigestaTocMobileOpus content={toc.filter((opus)=>{ return (opus.id === chosenOpus)})[0]}/> : false}

        </>
    )
}

export default DigestaTocMobileOpera