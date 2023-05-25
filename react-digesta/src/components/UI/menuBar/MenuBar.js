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
import DropDownStatistics from "../dropDownStatistics/DropDownStatistics";

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
    // const [activeSection, setActiveSection] = useState('')
    const activeSection = useSelector(state=>state.ui.activeSection)

    const digestaNav = [classes.main_nav__item]
    const juristsNav = [classes.main_nav__item]
    const operaNav = [classes.main_nav__item]
    const lookUpNav = [classes.main_nav__item]
    const statisticsNav = [classes.main_nav__item]
    switch (activeSection) {
        case "digestaNav":
            digestaNav.push(classes.main_nav__active)
            break
        case "juristsNav":
            juristsNav.push(classes.main_nav__active)
            break
        case "operaNav":
            operaNav.push(classes.main_nav__active)
            break
        case "lookUpNav":
            lookUpNav.push(classes.main_nav__active)
            break
        case "statisticsNav":
            statisticsNav.push(classes.main_nav__active)
            break
        default:
            break
    }

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

    const chooseSectionHandler = (e) => {
        dispatch(uiActions.setActiveSection(e.target.id))
    }

    return (
        <>
            {commentedParagraphiModalOpen && <CommentedParagraphiModal commentedParagraphi={commentedParagraphi}
                                                                       onClose={commentedParagraphiOpenHandler}
                                                                       onCloseMobileMenu={setMobileMenuOpen}/>}
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
                            {loggedIn && <li className={classes.main_nav__comments}>
                                <button onClick={commentedParagraphiOpenHandler}>Skomentowane
                                    Paragrafy {commentedParagraphi.length}</button>
                            </li>}

                            <li className={classes.main_nav__item_space}/>


                            <li className={digestaNav.join(' ')}>
                                <Link onClick={chooseSectionHandler} to={"/digesta"}><span
                                    id="digestaNav">Digesta</span></Link>
                            </li>
                            <li className={juristsNav.join(' ')}>
                                <Link onClick={chooseSectionHandler} to={"/jurysci"}><span
                                    id="juristsNav">Juryści</span></Link>
                            </li>
                            <li className={operaNav.join(' ')}>
                                <Link onClick={chooseSectionHandler} to={"/opera"}><span
                                    id="operaNav">Prace jurystów</span></Link>
                            </li>
                            <li className={lookUpNav.join(' ')}>
                                <Link onClick={chooseSectionHandler} to={"/wyszukaj"}><span
                                    id="lookUpNav">Wyszukaj</span> </Link>
                            </li>
                            <li className={statisticsNav.join(' ')}>
                                {/*<Link onClick={chooseSectionHandler} to={"/statystyki"}><span*/}
                                {/*    id="statisticsNav">Statystyki</span></Link>*/}
                                <DropDownStatistics onClick={chooseSectionHandler}/>
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