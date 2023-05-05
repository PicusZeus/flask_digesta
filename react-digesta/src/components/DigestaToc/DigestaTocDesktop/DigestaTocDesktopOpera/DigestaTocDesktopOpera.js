import DigestaTocDesktopOpus from "../DigestaTocDesktopOpus/DigestaTocDesktopOpus";
import classes from "./DigestaTocDesktopOpera.module.css"

const DigestaTocDesktopOpera = ({opera}) => {


    return (
        <div className={classes.main_toc}>
            <h4 className={classes.main_toc__title}>Prace cytowane w Digestach</h4>

            <ul className={classes.main_toc__items}>
                {opera.map((opus)=>(
                    <DigestaTocDesktopOpus key={opus.id} opus={opus}/>
                ))}

            </ul>

        </div>
    )
}

export default DigestaTocDesktopOpera