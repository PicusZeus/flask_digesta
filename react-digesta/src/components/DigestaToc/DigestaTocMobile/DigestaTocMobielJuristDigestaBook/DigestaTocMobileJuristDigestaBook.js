import TocMobile from "../../../UI/TocMobile/TocMobile";
import DigestaTocMobileJuristDigestaTitulus from "../DigestaTocMobileJuristDigestaTitulus/DigestaTocMobileJuristDigestaTitulus";
import { getTituliAuthor } from "../../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import NotificationService from "../../../../services/notification.service";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../UI/spinner/Spinner";
import { digestaActions } from "../../../../store/digesta-slice";

const DigestaTocMobileJuristDigestaBook = ({ book_id, author_id }) => {
  const chosenTitulusId = useSelector((state) => state.digesta.chosenTitulusId);
  const dispatch = useDispatch();
  const notificationSetter = new NotificationService(dispatch);
  const onOptionChangeHandler = (event) => {
    dispatch(digestaActions.setChosenTitulusId(parseInt(event.target.value)));
  };

  const {
    data: tituli,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["digesta", "tituli", "author", book_id, author_id],
    queryFn: () => getTituliAuthor(book_id, author_id),
    onError: () => {
      notificationSetter.setNotificationError(
        "Błąd ładowania",
        "Nie udało się załadować tytułów"
      );
    },
  });

  let chosenTitulus = false;

  if (isSuccess) {
    chosenTitulus = tituli.filter((t) => t.id === chosenTitulusId).shift();
  }

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <>
      <TocMobile onOption={onOptionChangeHandler}>
        <option value={""}>
          {chosenTitulus
            ? `${chosenTitulus.number} ${chosenTitulus.title_lat}`
            : "Wybierz Tytuł"}
        </option>
        {tituli &&
          tituli.map((titulus) => (
            <option key={titulus.id} value={titulus.id}>
              {titulus.number} {titulus.title_lat}
            </option>
          ))}
        })}
      </TocMobile>
      {chosenTitulus && (
        <DigestaTocMobileJuristDigestaTitulus
          author_id={author_id}
          titulus_id={chosenTitulusId}
        />
      )}
    </>
  );
};
export default DigestaTocMobileJuristDigestaBook;
