import { useNavigate } from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";
import { useDispatch, useSelector } from "react-redux";
import { digestaActions } from "../../../../store/digesta-slice";

const DigestaTocMobileJurists = ({ jurists }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onOptionChangeHandler = (event) => {
    dispatch(digestaActions.setChosenJuristId(event.target.value));
    navigate(event.target.value);
  };
  const chosenJuristId = useSelector((state) => state.digesta.chosenJuristId);
  const chosenJurist = jurists.filter((j) => j.id === chosenJuristId).shift();
  return (
    <TocMobile onOption={onOptionChangeHandler}>
      <option key={"no_jurist"} value={""}>
        {chosenJurist ? chosenJurist.name : "Wybierz Jurystę"}
      </option>
      {jurists &&
        jurists.map((jurist) => (
          <option key={jurist.id} value={jurist.id}>
            {jurist.name}
          </option>
        ))}
      })}
    </TocMobile>
  );
};

export default DigestaTocMobileJurists;
