import TocMobile from "../../../UI/TocMobile/TocMobile";
import DigestaTocMobileJuristDigestaBook from "../DigestaTocMobielJuristDigestaBook/DigestaTocMobileJuristDigestaBook";
import { useDispatch, useSelector } from "react-redux";
import { digestaActions } from "../../../../store/digesta-slice";

const DigestaTocMobileJuristDigestaBooks = ({ books, author_id }) => {
  const dispatch = useDispatch();
  const sortedBooks = [...books];
  sortedBooks.sort((a, b) => {
    return a.book_nr - b.book_nr;
  });
  const onOptionChangeHandler = (event) => {
    const book_id = event.target.value;
    dispatch(digestaActions.setChosenBookId(parseInt(book_id)));
  };
  const chosenBookId = useSelector((state) => state.digesta.chosenBookId);

  const chosenBook = books.filter((b) => b.id === chosenBookId).shift();
  return (
    <>
      <TocMobile onOption={onOptionChangeHandler}>
        <option value={""}>
          {chosenBook ? chosenBook.book_latin_name : "Wybierz księgę"}
        </option>
        {sortedBooks.map((book) => (
          <option key={book.id} value={book.id}>
            {book.book_latin_name}
          </option>
        ))}
        })}
      </TocMobile>

      {chosenBookId ? (
        <DigestaTocMobileJuristDigestaBook
          book_id={chosenBookId}
          author_id={author_id}
        />
      ) : (
        false
      )}
    </>
  );
};

export default DigestaTocMobileJuristDigestaBooks;
