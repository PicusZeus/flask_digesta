import classes from "./Footer.module.css"

const Footer = (props) => {

    return (
        <footer className={classes.main_footer}>
            <nav>
                <ul className={classes.main_footer__links}>
                    <li className={classes.main_footer__link}>
                        <button>Wydział prawa</button>
                    </li>

                    <li className={classes.main_footer__email}>
                        <button>Jeśli masz uwagi lub pytanie, pisz</button>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer
