import classes from "./MenuBar.module.css"
import {Link} from "react-router-dom";
import Login from "../../authorization/login/Login";
import Register from "../../authorization/register/Register"
import {useSelector, useDispatch} from "react-redux";
import {uiActions} from "../../../store/ui-slice";
import {logout} from "../../../store/auth-actions";
import Notification from "../Notification/Notification";
import logo from "./justynian.jpg"
const MenuBar = (props) => {

    const loggedIn = useSelector((state) => state.auth.loggedIn)
    const logging = useSelector((state) => state.ui.logging)
    const registering = useSelector((state) => state.ui.registering)
    const token = useSelector(state => state.auth.tokens.access_token)
    const dispatch = useDispatch()
    const notification = useSelector(state => state.ui.notification)

    const logingToggleHandler = () => {
        console.log(loggedIn)
        dispatch(uiActions.logingToggle())
    }

    const registerToggleHandler = () => {
        dispatch(uiActions.registeringToggle())

    }

    const logoutHandler = () => {

        dispatch(logout(token))

    }

    return (
        <>
            {logging ? <Login onClose={logingToggleHandler}/> : null}

            {registering ? <Register onClose={registerToggleHandler}/> : null}
            <header className={classes.main_header}>
                {notification &&
                    <Notification
                        status={notification.status}
                        title={notification.title}
                        message={notification.message}/>
                }
                <div>
                    <Link to="/" className={classes.toggle_button}>
                        <span className={classes.toggle_button__bar}></span>
                        <span className={classes.toggle_button__bar}></span>
                        <span className={classes.toggle_button__bar}></span>
                    </Link>
                    <a className={classes.main_header__brand} href="/"><img src={logo} alt="Digesta"/></a>
                </div>
                <nav className={classes.main_nav}>
                    <ul className={classes.main_nav__items}>

                        {loggedIn && <li className={classes.main_nav__logout}>
                            <button onClick={logoutHandler}>Wyloguj się</button>
                        </li>}

                        {!loggedIn && <li className={classes.main_nav__login}>
                            <button onClick={logingToggleHandler}>Zaloguj się</button>
                        </li>}

                        {!loggedIn && <li className={classes.main_nav__login}>
                            <button onClick={registerToggleHandler}>Zarejestruj się</button>
                        </li>}

                        <li className={classes.main_nav__item}>
                            <Link to={"/digesta"}>Digesta - tekst oryginalny i tłumaczenie</Link>
                        </li>
                        <li className={classes.main_nav__item}>
                            <Link to={"/jurysci"}>Digesta - przeglądaj tekst wg jurystów i ich dziełt</Link>
                        </li>
                        <li className={classes.main_nav__item}>
                            <Link to={"/wyszukaj"}>Digesta - wyszukaj w tekście</Link>
                        </li>
                    </ul>


                </nav>
            </header>
        </>

    )
}

export default MenuBar