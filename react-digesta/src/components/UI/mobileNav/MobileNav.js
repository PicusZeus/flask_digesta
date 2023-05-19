import {Link} from "react-router-dom";
import classes from "./MobileNav.module.css";
import tokenService from "../../../services/token.service";

const MobileNav = (props) => {
    const user_id = tokenService.getUserId()
    let logging = (
        <>

            <li className={classes.mobile_nav__login}>
                <button onClick={props.onToggleLogging}>Zaloguj się</button>
            </li>
            <li className={classes.mobile_nav__login}>
                <button onClick={props.onToggleRegistering}>Zarejestruj się</button>
            </li>

        </>
    )

    if (user_id) {
        logging = (
            <>
                <li className={classes.mobile_nav__login}>
                    <button onClick={props.onToggleParagraphi}>Skomentowane ustawy
                    </button>
                </li>
                <li className={classes.mobile_nav__login}>
                    <button onClick={props.onLogout}>Wyloguj się</button>
                </li>
            </>

        )
    }

    const mobileNav = [classes.mobile_nav]
    const backdrop = [classes.backdrop]

    if (props.open) {
        mobileNav.push(classes.open)
        backdrop.push(classes.open)
    }

    return (
        <>
            <div className={backdrop.join(' ')} onClick={() => props.onToggle(!props.open)}/>
            <nav className={mobileNav.join(' ')}>
                <ul className={classes.mobile_nav__items}>
                    <li className={classes.mobile_nav__item}>
                        <Link onClick={() => props.onToggle(!props.open)} to="/digesta">
                            Digesta
                        </Link>
                    </li>
                    <li className={classes.mobile_nav__item}>
                        <Link onClick={() => props.onToggle(!props.open)} to="/jurysci">
                            Juryści
                        </Link>
                    </li>
                    <li className={classes.mobile_nav__item}>
                        <Link onClick={() => props.onToggle(!props.open)} to="/opera">
                            Opera
                        </Link>
                    </li>
                    <li className={classes.mobile_nav__item}>
                        <Link onClick={() => props.onToggle(!props.open)} to="/wyszukaj">
                            Wyszukaj
                        </Link>
                    </li>
                    <li className={classes.mobile_nav__item}>
                        <Link onClick={() => props.onToggle(!props.open)} to="/statystyki">
                            Statystyki
                        </Link>
                    </li>
                    {logging}

                </ul>
            </nav>
        </>
    )
}

export default MobileNav