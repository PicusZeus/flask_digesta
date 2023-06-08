import classes from "./DigestaTocDesktopJuristDigestaBook.module.css";
import DigestaTocDesktopJuristDigestaTitulus from "../DigestaTocDesktopJuristDigestaTitulus/DigestaTocDesktopJuristDigestaTitulus";
import { useDispatch, useSelector } from "react-redux";
import { digestaActions } from "../../../../store/digesta-slice";
import NotificationService from "../../../../services/notification.service";
import { useQuery } from "@tanstack/react-query";
import { getTituliAuthor } from "../../../../api/api";
import Spinner from "../../../UI/spinner/Spinner";

const DigestaTocDesktopJuristDigestaBook = ({ book, author_id }) => {
  const chosenBookId = useSelector((state) => state.digesta.chosenBookId);
  const dispatch = useDispatch();
  const notificationSetter = new NotificationService(dispatch);

  const { data: tituli, isFetching } = useQuery({
    queryKey: ["digesta", "tituli", "author", book.id, author_id],
    queryFn: () => getTituliAuthor(book.id, author_id),
    onError: () => {
      notificationSetter.setNotificationError(
        "Błąd sieci",
        "Nie udało się załadować spisu tytułów dla księgi i jurysty"
      );
    },
    initialData: [],
  });
  if (isFetching) {
    return <Spinner />;
  }

  const openBookHandler = () => {
    if (book.id === chosenBookId) {
      dispatch(digestaActions.setChosenBookId(null))
    } else {
      dispatch(digestaActions.setChosenBookId(book.id));

    }

  };

  return (
    <li>
      <button className={classes.main_toc__book} onClick={openBookHandler}>
        <span className={classes.bookCut}>Liber {book.book_nr}</span>
      </button>
      {chosenBookId === book.id && (
        <div className={classes.main_toc__tituli}>
          <div>&nbsp;</div>
          <ul className={classes.main_toc__tituli_items}>
            {tituli.map((titulus) => {
              return (
                <DigestaTocDesktopJuristDigestaTitulus
                  key={titulus.id}
                  titulus={titulus}
                  author_id={author_id}
                />
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
};

export default DigestaTocDesktopJuristDigestaBook;
