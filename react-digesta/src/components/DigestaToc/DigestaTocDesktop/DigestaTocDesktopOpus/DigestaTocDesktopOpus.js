import { useState } from "react";
import DigestaTocDesktopOpusLiber from "../DigestaTocDesktopOpusLiber/DigestaTocDesktopOpusLiber";
import classes from "./DigestaTocDesktopOpus.module.css";
import { useDispatch, useSelector } from "react-redux";
import { digestaActions } from "../../../../store/digesta-slice";

const DigestaTocDesktopOpus = ({ opus, lexPath }) => {
  const chosenOpusId = useSelector((state) => state.digesta.chosenOpusId);
  // const [menuLibriOpen, setMenuLibriOpen] = useState(chosenOpusId === opus.id);
  const dispatch = useDispatch();

  const openOpusHandler = () => {
    if (chosenOpusId === opus.id) {
       dispatch(digestaActions.setChosenOpusId(null));
    } else {
        dispatch(digestaActions.setChosenOpusId(opus.id));
        dispatch(digestaActions.setChosenOpusLiberId(null));
    }

    // }
    // setMenuLibriOpen((current) => !current);
  };
  const libriLength = opus.libri.length;

  const libri = opus.libri;
  libri.sort((a, b) => {
    return parseInt(a.liber) - parseInt(b.liber);
  });

  return (
    <li>
      <button className={classes.main_toc__opus} onClick={openOpusHandler}>
        <p>{opus.title_lat}</p>
        <p>{opus.author.name}</p>
      </button>

      {chosenOpusId === opus.id && (
        <div className={classes.main_toc__libri}>
          <ul className={classes.main_toc__libri_items}>
            {libri.map((liber) => (
              <DigestaTocDesktopOpusLiber
                key={liber.id}
                liber={liber}
                libriLength={libriLength}
                lexPath={lexPath}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default DigestaTocDesktopOpus;
