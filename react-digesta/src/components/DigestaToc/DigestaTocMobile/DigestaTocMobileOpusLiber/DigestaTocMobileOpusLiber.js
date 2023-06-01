import TocMobile from "../../../UI/TocMobile/TocMobile";
import { useNavigate } from "react-router-dom";
import { getLegesOpus } from "../../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import NotificationService from "../../../../services/notification.service";
import Spinner from "../../../UI/spinner/Spinner";
import { digestaActions } from "../../../../store/digesta-slice";

const DigestaTocMobileOpusLiber = ({ liber, lexPath }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const notificationSetter = new NotificationService(dispatch);

  const { data: leges, isFetching } = useQuery({
    queryKey: ["digesta", "opus", "leges", liber.id],
    queryFn: () => getLegesOpus(liber.id),
    onError: () => {
      notificationSetter.setNotificationError(
        "Błąd ładowania",
        "Nie udało załadować się listy ustaw dla tego dzieła"
      );
    },
  });

  if (isFetching) {
    return <Spinner />;
  }

  const onChoseLexHandler = (event) => {
    const lex_id = event.target.value;
    dispatch(digestaActions.setChosenLexId(lex_id));
    navigate(lexPath + lex_id.toString());
  };

  return (
    <TocMobile onOption={onChoseLexHandler}>
      <option value={""}>Wybierz fragment</option>
      {leges &&
        leges.map((lex) => (
          <option key={lex.id} value={lex.id}>
            {"D." +
              lex.titulus.book.book_nr +
              "." +
              lex.titulus.number +
              "." +
              lex.lex_nr}
          </option>
        ))}
    </TocMobile>
  );
};

export default DigestaTocMobileOpusLiber;
