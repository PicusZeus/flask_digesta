import { Link } from "react-router-dom";
import classes from "./MobileNav.module.css";
import tokenService from "../../../services/token.service";

const MobileNav = ({
  onToggleLogging,
  onToggleRegistering,
  onToggle,
  onToggleParagraphi,
  onLogout,
  open,
}) => {
  const user_id = tokenService.getUserId();
  let logging = (
    <>
      <li className={classes.mobile_nav__login}>
        <button onClick={onToggleLogging}>Zaloguj się</button>
      </li>
      <li className={classes.mobile_nav__login}>
        <button onClick={onToggleRegistering}>Zarejestruj się</button>
      </li>
    </>
  );

  if (user_id) {
    logging = (
      <>
        <li className={classes.mobile_nav__login}>
          <button onClick={onToggleParagraphi}>Skomentowane ustawy</button>
        </li>
        <li className={classes.mobile_nav__login}>
          <button onClick={onLogout}>Wyloguj się</button>
        </li>
      </>
    );
  }

  const mobileNav = [classes.mobile_nav];
  const backdrop = [classes.backdrop];

  if (open) {
    mobileNav.push(classes.open);
    backdrop.push(classes.open);
  }

  return (
    <>
      <div className={backdrop.join(" ")} onClick={() => onToggle(!open)} />
      <nav className={mobileNav.join(" ")}>
        <ul className={classes.mobile_nav__items}>
          <li className={classes.mobile_nav__item}>
            <Link onClick={() => onToggle(!open)} to="/digesta">
              Digesta
            </Link>
          </li>
          <li className={classes.mobile_nav__item}>
            <Link onClick={() => onToggle(!open)} to="/jurysci">
              Juryści
            </Link>
          </li>
          <li className={classes.mobile_nav__item}>
            <Link onClick={() => onToggle(!open)} to="/opera">
              Prace jurystów
            </Link>
          </li>
          <li className={classes.mobile_nav__item}>
            <Link onClick={() => onToggle(!open)} to="/wyszukaj">
              Wyszukaj
            </Link>
          </li>
          <li className={classes.mobile_nav__item}>
            <Link onClick={() => onToggle(!open)} to="/statystyki">
              Statystyki
            </Link>
          </li>
          {logging}
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
