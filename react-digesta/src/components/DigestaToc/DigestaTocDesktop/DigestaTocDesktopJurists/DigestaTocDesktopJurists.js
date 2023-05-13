import classes from "./DigestaTocDesktopJurists.module.css"
import DigestaTocDesktopJurist from "../DigestaTocDesktopJurist/DigestaTocDesktopJurist";

const DigestaTocDesktopJurists = ({jurists}) => {



    return (
        <div className={classes.main_toc}>
            <h4 className={classes.main_toc__title}>Juryści w Digestach</h4>
            <ul className={classes.main_toc__items}>
                {jurists && jurists.map((jurist) => (
                        <DigestaTocDesktopJurist key={jurist.id} jurist={jurist}/>

                    ))}
            </ul>

        </div>
    )
}
export default DigestaTocDesktopJurists