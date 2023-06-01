import { useEffect, useRef, useState } from "react";
import classes from "./DigestaTocDesktopOpusLiber.module.css";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import { useDispatch, useSelector } from "react-redux";
import NotificationService from "../../../../services/notification.service";
import { useQuery } from "@tanstack/react-query";
import { getLegesOpus } from "../../../../api/api";
import { digestaActions } from "../../../../store/digesta-slice";
import Spinner from "../../../UI/spinner/Spinner";
import { isNumeric } from "../../../../services/helpers";
const DigestaTocDesktopOpusLiber = ({ liber, libriLength, lexPath }) => {
  const ref = useRef(null);
  const chosenOpusLiberId = useSelector(
    (state) => state.digesta.chosenOpusLiberId
  );

  const [openLegesMenu, setOpenLegesMenu] = useState(
    chosenOpusLiberId === liber.id
  );
  const dispatch = useDispatch();
  const notificationSetter = new NotificationService(dispatch);
  const liberLineClasses = [classes.liber__line];

  const { data: leges, isFetching } = useQuery({
    queryKey: ["digesta", "opus", "leges", liber.id],
    queryFn: () => getLegesOpus(liber.id),
    onError: () => {
      notificationSetter.setNotificationError(
        "Błąd połączenia",
        "Nie udało się załadować spisu ustaw"
      );
    },
  });

  const openLiberHandler = () => {
    if (!openLegesMenu) {
      dispatch(digestaActions.setChosenOpusLiberId(liber.id));
    }
    setOpenLegesMenu((current) => !current);
  };
  useEffect(() => {
    if (chosenOpusLiberId === liber.id && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  if (libriLength === 1) {
    liberLineClasses.push(classes.liber__line_single);
  }
  if (isFetching) {
    return <Spinner />;
  }

  return (
    <li ref={ref} className={classes.liber_main}>
      <div className={liberLineClasses.join(" ")}>&nbsp;</div>

      <div className={classes.liber_group}>
        <div>&nbsp;</div>
        <button onClick={openLiberHandler}>
          {isNumeric(liber.liber) ? "Liber" : ""} {liber.liber}
        </button>
      </div>
      {openLegesMenu && leges && (
        <div className={classes.liber__leges_group}>
          <ul className={classes.liber__leges_group__items}>
            {leges.map((lex) => {
              const address = `D.${lex.titulus.book.book_nr}.${lex.titulus.number}.${lex.lex_nr}`;
              return (
                <DigestaTocDesktopLex
                  address={address}
                  key={lex.id}
                  path={lexPath}
                  lex={lex}
                  legesLength={leges.length}
                />
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
};

export default DigestaTocDesktopOpusLiber;
