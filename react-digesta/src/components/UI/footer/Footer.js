import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.main_footer}>
      <nav>
        <ul className={classes.main_footer__links}>
          {/*<li className={classes.main_footer__link}>*/}
          {/*    <a href="">Wydział prawa</a>*/}
          {/*</li>*/}

          <li className={classes.main_footer__email}>
            <a href="mailto: picusdev@gmail.com">
              Jeśli masz uwagi lub pytanie, pisz
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
