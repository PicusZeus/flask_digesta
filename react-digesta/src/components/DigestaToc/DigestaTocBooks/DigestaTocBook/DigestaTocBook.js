import classes from "./DigestaTocBook.module.css"
import {useState} from "react";
import DigestaTocTitulus from "./DigestaTocTitulus/DigestaTocTitulus";

const DigestaTocBook = (props) => {
    const [chosenTitulus, setChosenTitulus] = useState(null)

    const onOptionChangeHandler = (event) => {

        setChosenTitulus(parseInt(event.target.value))

    }

    const tituli = props.content.tituli


    return (
        <>
            <label className={classes.main_toc__label}>Wybierz Tytuł</label>

            <select className={classes.main_toc__titulus_option} onChange={onOptionChangeHandler}>
                <option key={666666} value={null}>Wybierz Tytuł</option>

                {tituli && tituli.map(titulus => (
                    <option key={titulus.id} value={titulus.id}>{titulus.number} {titulus.title_lat}</option>))}
                })}
            </select>

            {chosenTitulus && <DigestaTocTitulus leges={tituli.filter((titulus) => {
                return (titulus.id === chosenTitulus)
            })[0].leges}/>}
        </>
    )
}
export default DigestaTocBook

