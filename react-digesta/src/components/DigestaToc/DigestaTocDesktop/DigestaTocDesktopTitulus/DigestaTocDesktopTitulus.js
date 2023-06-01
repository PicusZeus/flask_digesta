import { useState } from "react";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import classes from "./DigestaTocDesktopTitulus.module.css";
import NotificationService from "../../../../services/notification.service";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getLeges } from "../../../../api/api";
import Spinner from "../../../UI/spinner/Spinner";

const DigestaTocDesktopTitulus = ({ titulus }) => {
  const chosenTitulusId = useSelector((state) => state.digesta.chosenTitulusId);
  const [titulusMenuOpen, setTitulusMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const notificationSetter = new NotificationService(dispatch);

  const { data: leges, isFetching } = useQuery({
    queryKey: ["digesta", "titulus", "leges", titulus.id],
    queryFn: () => getLeges(titulus.id),
    onError: () => {
      notificationSetter.setNotificationError(
        "Ładowanie tytułu",
        "Błąd Servera"
      );
    },
  });

  if (isFetching) {
    return <Spinner />;
  }

  const openTitulusHandler = () => {
    setTitulusMenuOpen((current) => !current);
  };
  return (
    <li className={classes.titulus_main}>
      <div className={classes.titulus__line}>&nbsp;</div>
      <div className={classes.titulus_group}>
        <div>&nbsp;</div>
        <button onClick={openTitulusHandler}>
          <p>Titulus {titulus.number}</p>
          <p>{titulus.title_lat}</p>
        </button>
      </div>
      {(titulusMenuOpen || titulus.id === chosenTitulusId) && leges && (
        <div className={classes.titulus__leges_group}>
          <ul>
            {leges.map((lex) => (
              <DigestaTocDesktopLex
                key={lex.id}
                path="/digesta/"
                lex={lex}
                legesLength={leges.length}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default DigestaTocDesktopTitulus;
