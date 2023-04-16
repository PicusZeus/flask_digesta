import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import classes from "MobileNav.module.css";
const MobileNav = (props) => {
    const isLoggedin = useSelector(state => state.auth.loggedIn)

    let logging = (
        <li className={classes.mobileNav__login}>
            <a>Zaloguj się</a>
        </li>
    )

    if (isLoggedin) {
        logging = (
            <li className="mobile-nav__logout">
                <button onClick={props.logout}>Wyloguj się</button>
            </li>
        )
    }


    return (
        <nav className="mobile-nav">
            <ul className="mobile-nav__items">
                <li className="mobile-nav__item">
                    <Link to="/digesta">
                        Digesta
                    </Link>
                </li>
                <li className="mobile-nav__item">
                    <Link to="/jurysci">
                        Juryści
                    </Link>
                </li>
                <li className="mobile-nav__item">
                    <Link to="/wyszukaj">
                        Wyszukaj
                    </Link>
                </li>
                {logging}

            </ul>
        </nav>
    )
}

export default MobileNav