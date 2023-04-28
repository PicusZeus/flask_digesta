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
import Modal from "../modal/Modal";
const MenuBar = (props) => {

    const [commentedParagraphiModal, setCommentedParagraphiModal] = useState(false)
    const logged_in = tokenService.getUsername()
    const logging = useSelector((state) => state.ui.logging)
    const registering = useSelector((state) => state.ui.registering)
    const token = tokenService.getLocalAccessToken()
    const dispatch = useDispatch()
    const notification = useSelector(state => state.ui.notification)

    const commentedParagraphi = tokenService.getCommentedParagraphi()

    let numberOfCommentedParagraphi = 0
    if (commentedParagraphi) {numberOfCommentedParagraphi = commentedParagraphi.length}

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const logingToggleHandler = () => {
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
            {commentedParagraphiModal && <Modal onClose={()=>setCommentedParagraphiModal(false)}>
                <ul>
                    {commentedParagraphi.map((par)=>(<li><Link onClick={()=>setCommentedParagraphiModal(false)} to={"/digesta/" + par.lex.id + '/' + par.id}>D {par.lex.titulus.book.book_nr}.{par.lex.titulus.number}.{par.lex.lex_nr}.{par.key}</Link></li>))}
                </ul>
            </Modal>}
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
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={classes.toggle_button}>
                        <span className={classes.toggle_button__bar}></span>
                        <span className={classes.toggle_button__bar}></span>
                        <span className={classes.toggle_button__bar}></span>
                    </button>
                    <a className={classes.main_header__brand} href="/"><img src={logo} alt="Digesta"/></a>
                </div>
                <nav className={classes.main_nav}>
                    <ul className={classes.main_nav__items}>

                        {logged_in && <li className={classes.main_nav__logout}>
                            <button onClick={logoutHandler}>Wyloguj się</button>
                        </li>}

                        {!logged_in && <li className={classes.main_nav__login}>
                            <button onClick={logingToggleHandler}>Zaloguj się</button>
                        </li>}

                        {!logged_in && <li className={classes.main_nav__login}>
                            <button onClick={registerToggleHandler}>Zarejestruj się</button>
                        </li>}
                        {logged_in && <li className={classes.main_nav__item}><button onClick={()=>setCommentedParagraphiModal(true)}>Skomentowane Paragrafy {numberOfCommentedParagraphi}</button></li> }

                        <li className={classes.main_nav__item}>
                            <Link to={"/digesta"}>Digesta - tekst oryginalny i tłumaczenie</Link>
                        </li>
                        <li className={classes.main_nav__item}>
                            <Link to={"/jurysci"}>Digesta - przeglądaj tekst wg jurystów i ich dzieł</Link>
                        </li>
                        <li className={classes.main_nav__item}>
                            <Link to={"/opera"}>Digesta - przeglądaj cytowane w Digestach dzieła jurystów i ich dzieł</Link>
                        </li>
                        <li className={classes.main_nav__item}>
                            <Link to={"/wyszukaj"}>Digesta - wyszukaj w tekście</Link>
                        </li>
                    </ul>


                </nav>

            </header>

            <MobileNav open={mobileMenuOpen}
                       onToggle={setMobileMenuOpen}
                       onToggleLogging={logingToggleHandler}
                       onToggleRegistering={registerToggleHandler}
                       onLogout={logoutHandler}
            />

        </>

    )
}

export default MenuBar