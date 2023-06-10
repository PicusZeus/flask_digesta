import classes from "./DigestaTocDesktopJuristDigestaTitulus.module.css";
import { useDispatch, useSelector } from "react-redux";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";
import { digestaActions } from "../../../../store/digesta-slice";
import { useQuery } from "@tanstack/react-query";
import { getLegesAuthor } from "../../../../api/api";
import Spinner from "../../../UI/spinner/Spinner";

const DigestaTocDesktopJuristDigestaTitulus = ({ titulus, author_id }) => {
  const chosenTitulusId = useSelector((state) => state.digesta.chosenTitulusId);

  const dispatch = useDispatch();

  const { data: leges, isFetching } = useQuery({
    queryKey: ["digesta", "titulus", "leges", "author", titulus.id, author_id],
    queryFn: () => getLegesAuthor(titulus.id, author_id),
  });
  if (isFetching) {
    return <Spinner />;
  }

  const openTitulusHandler = () => {
    if (titulus.id === chosenTitulusId) {
      dispatch(digestaActions.setChosenTitulusId(null));
    } else {
      dispatch(digestaActions.setChosenTitulusId(titulus.id));
    }
    // }
  };
  const path = `/jurysci/digesta/${author_id}/`;

  return (
    <li className={classes.titulus_main}>
      <div className={classes.titulus__line}>&nbsp;</div>

      <div className={classes.titulus_group}>
        <div>&nbsp;</div>
        <button onClick={openTitulusHandler}>
          <p>Titulus {titulus.number}</p>
          {/*<p>{titulus.title_pl}</p>*/}
          <p>{titulus.title_lat}</p>
        </button>
      </div>
      {chosenTitulusId === titulus.id && leges && (
        <div className={classes.titulus__leges_group}>
          <ul>
            {leges.map((lex) => (
              <DigestaTocDesktopLex
                key={lex.id}
                path={path}
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

export default DigestaTocDesktopJuristDigestaTitulus;
