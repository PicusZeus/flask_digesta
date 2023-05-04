import classes from "./MenuBar.module.css"
import {Link} from "react-router-dom";
import Login from "../../authorization/login/Login";
import Register from "../../authorization/register/Register"
import {useSelector, useDispatch} from "react-redux";
import {uiActions} from "../../../store/ui-slice";
import {logout} from "../../../store/auth-actions";
import Notification from "../Notification/Notification";
import logo from "./justynian.jpg"
import MobileNav from "../mobileNav/MobileNav";
import {useState} from "react";
import tokenService from "../../../services/token.service";
import CommentedParagraphiModal from "../../commentedParagraphiModal/CommentedParagraphiModal";

const MenuBar = () => {
    const dispatch = useDispatch()

    const [commentedParagraphiModalOpen, setCommentedParagraphiModalOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


    const loggedIn = useSelector(state => state.auth.username)
    const logging = useSelector((state) => state.ui.logging)
    const registering = useSelector((state) => state.ui.registering)
    const notification = useSelector(state => state.ui.notification)
    const commentedParagraphi = useSelector(state => state.auth.commentedParagraphi)

    const token = tokenService.getLocalAccessToken()

    const logingToggleHandler = () => {
        dispatch(uiActions.logingToggle())
    }

    const registerToggleHandler = () => {
        dispatch(uiActions.registeringToggle())
    }

    const commentedParagraphiOpenHandler = () => {
        setCommentedParagraphiModalOpen((current) => !current)
    }

    const logoutHandler = () => {
        dispatch(logout(token))
    }

    return (
        <>
            {commentedParagraphiModalOpen && <CommentedParagraphiModal commentedParagraphi={commentedParagraphi}
                                                                       onClose={commentedParagraphiOpenHandler}
                                                                       onCloseMobileMenu={mobileMenuOpen}/>}
            {logging && <Login onClose={logingToggleHandler}/>}

            {registering && <Register onClose={registerToggleHandler}/>}

            <header className={classes.main_header}>
                {notification &&
                    <Notification
                        status={notification.status}
                        title={notification.title}
                        message={notification.message}/>
                }
                <nav className={classes.nav__container}>
                    <div>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={classes.toggle_button}>
                            <span className={classes.toggle_button__bar}></span>
                            <span className={classes.toggle_button__bar}></span>
                            <span className={classes.toggle_button__bar}></span>
                        </button>
                        <a className={classes.main_header__brand} href="/"><img src={logo} alt="Digesta"/></a>
                    </div>
                    <nav className={classes.main_nav}>
                        <ul className={classes.main_nav__items}>


                            {loggedIn && <li className={classes.main_nav__logout}>
                                <button onClick={logoutHandler}>Wyloguj się</button>
                            </li>}

                            {!loggedIn && <li className={classes.main_nav__login}>
                                <button onClick={logingToggleHandler}>Logowanie</button>
                            </li>}

                            {!loggedIn && <li className={classes.main_nav__login}>
                                <button onClick={registerToggleHandler}>Rejestracja</button>
                            </li>}
                            {loggedIn && <li className={classes.main_nav__comments}><button onClick={commentedParagraphiOpenHandler}>Skomentowane
                                Paragrafy {commentedParagraphi.length}</button></li>}

                            <li className={classes.main_nav__item_space}/>


                            <li className={classes.main_nav__item}>
                                <Link to={"/digesta"}>Digesta</Link>
                            </li>
                            <li className={classes.main_nav__item}>
                                <Link to={"/jurysci"}>Juryści</Link>
                            </li>
                            <li className={classes.main_nav__item}>
                                <Link to={"/opera"}>Dzieła jurystów</Link>
                            </li>
                            <li className={classes.main_nav__item}>
                                <Link to={"/wyszukaj"}>Wyszukaj</Link>
                            </li>
                        </ul>


                    </nav>
                </nav>
            </header>

            <MobileNav open={mobileMenuOpen}
                       onToggle={setMobileMenuOpen}
                       onToggleLogging={logingToggleHandler}
                       onToggleRegistering={registerToggleHandler}
                       onToggleParagraphi={commentedParagraphiOpenHandler}
                       onLogout={logoutHandler}
            />

        </>

    )
}

export default MenuBar