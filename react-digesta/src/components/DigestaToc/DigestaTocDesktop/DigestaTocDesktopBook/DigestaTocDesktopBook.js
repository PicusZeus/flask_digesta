import DigestaTocDesktopTitulus from "../DigestaTocDesktopTitulus/DigestaTocDesktopTitulus";
import classes from "./DigestaTocDesktopBook.module.css";
import { useDispatch, useSelector } from "react-redux";
import { digestaActions } from "../../../../store/digesta-slice";
const DigestaTocDesktopBook = ({ book }) => {
  const dispatch = useDispatch();
  const chosenBookId = useSelector((state) => state.digesta.chosenBookId);

  const openTituliHandler = () => {
    if (chosenBookId === book.id) {
      dispatch(digestaActions.setChosenBookId(null));
    } else {
      dispatch(digestaActions.setChosenBookId(book.id));
    }
  };
  return (
    <li>
      <button className={classes.main_toc__book} onClick={openTituliHandler}>
        <span className={classes.bookCut}>{book.book_latin_name}</span>
      </button>
      {book.id === chosenBookId && (
        <div className={classes.main_toc__tituli}>
          <div>&nbsp;</div>
          <ul className={classes.main_toc__tituli_items}>
            {book.tituli.map((titulus) => (
              <DigestaTocDesktopTitulus key={titulus.id} titulus={titulus} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default DigestaTocDesktopBook;
