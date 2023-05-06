import classes from "./DigestaTocMobileOpera.module.css"
import DigestaTocMobileOpus from "../DigestaTocMobileOpus/DigestaTocMobileOpus";
import {useState} from "react";
import TocMobile from "../../../UI/TocMobile/TocMobile";

const DigestaTocMobileOpera = ({opera}) => {

    const [chosenOpus, setChosenOpus] = useState(false)
    const onOptionChangeHandler = (event) => {

        setChosenOpus(parseInt(event.target.value))

    }
    return (
        <>
            <TocMobile onOption={onOptionChangeHandler}>

                <option value={''}>Wybierz dzieło</option>
                {opera && opera.map(opus => {
                    return (<option key={opus.id} value={opus.id}>
                        Libri {opus.title_lat} - {opus.author.name}
                    </option>)
                })}

            </TocMobile>
            {chosenOpus ? <DigestaTocMobileOpus opus={opera.filter((opus) => {
                return (opus.id === chosenOpus)
            })[0]}/> : false}

        </>
    )
}

export default DigestaTocMobileOpera