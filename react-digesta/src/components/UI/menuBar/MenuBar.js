import classes from "./MenuBar.module.css"
import {Link} from "react-router-dom";
import {useState} from "react";
import Login from "../../authorization/login/Login";
import Register from "../../authorization/register/Register"
const MenuBar = (props) => {
    const [registering, setRegistering] = useState(false)
    const [logging, setLogging] = useState(false)


    const loginToggleHandler = () => {
        setLogging((prevState) => !prevState)
    }

    const registerToggleHandler = () => {
        setRegistering((prevState) => !prevState)
    }



    return (
        <>
            {logging ? <Login/>: null}

            {registering ? <Register/>: null}
            <header className={classes.main_header}>

                <div>
                    <Link to="/" className={classes.toggle_button}>
                        <span className={classes.toggle_button__bar}></span>
                        <span className={classes.toggle_button__bar}></span>
                        <span className={classes.toggle_button__bar}></span>
                    </Link>
                    <a className={classes.main_header__brand} href="/"><img src="" alt="Digesta"/></a>
                </div>
                <nav className={classes.main_nav}>
                    <ul className={classes.main_nav__items}>

                        <li className={classes.main_nav__logout}>
                            <button>Wyloguj się</button>
                        </li>

                        <li className={classes.main_nav__login}>
                            <button onClick={loginToggleHandler}>Zaloguj się</button>
                        </li>

                        <li className={classes.main_nav__login}>
                            <button onClick={registerToggleHandler}>Zarejestruj się</button>
                        </li>

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