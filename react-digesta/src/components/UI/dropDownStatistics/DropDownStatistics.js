import { useEffect, useState } from "react";
import classes from "./DropDownStatistics.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
const DropDownStatistics = ({ onClick }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(uiActions.setActiveSection("statisticsNav"));
  };

  const enterHandler = () => {
    setOpen(true);
  };

  const leaveHandler = () => {
    setOpen(false);
  };
  return (
    <div
      className={classes.dropdown}
      onMouseLeave={leaveHandler}
      onMouseEnter={enterHandler}
    >
      <button onClick={onClickHandler}>
        <Link to="/statystyki">
          <span>STATYSTYKI</span>
        </Link>
      </button>
      {open && (
        <ul className={classes.menu}>
          <li className={classes.menu_item}>
            <button onClick={onClickHandler}>
              <Link to="/statystyki/digesta">digesta</Link>
            </button>
          </li>
          <li className={classes.menu_item}>
            <button onClick={onClickHandler}>
              <Link to="/statystyki/jurysci">Juryści</Link>
            </button>
          </li>
          <li className={classes.menu_item}>
            <button onClick={onClickHandler}>
              <Link to="/statystyki/opera">Prace jurystów</Link>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropDownStatistics;
