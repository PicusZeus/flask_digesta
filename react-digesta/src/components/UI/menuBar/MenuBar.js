import classes from "./MenuBar.module.css"


const MenuBar = (props) => {


    return (
        <header className={classes.main_header}>
            <div>
                <button className={classes.toggle_button}>
                    <span className={classes.toggle_button__bar}></span>
                    <span className={classes.toggle_button__bar}></span>
                    <span className={classes.toggle_button__bar}></span>
                </button>
                <a className={classes.main_header__brand} href="/"><img src="" alt="Digesta"/></a>
            </div>
            <nav className={classes.main_nav}>
                <ul className={classes.main_nav__items}>

                    <li className={classes.main_nav__logout}>
                        <button>Wyloguj się</button>
                    </li>

                    <li className={classes.main_nav__login}>
                        <button>Zaloguj się</button>
                    </li>

                    <li className={classes.main_nav__login}>
                        <button>Zarejestruj się</button>
                    </li>

                    <li className={classes.main_nav__item}>
                        <button>Digesta - tekst oryginalny i tłumaczenie</button>
                    </li>
                    <li className={classes.main_nav__item}>
                        <button>Digesta - przeglądaj tekst wg jurystów i ich dziełt</button>
                    </li>
                    <li className={classes.main_nav__item}>
                        <button>Digesta - wyszukaj w tekście</button>
                    </li>
                </ul>


            </nav>
        </header>

    )
}

export default MenuBar