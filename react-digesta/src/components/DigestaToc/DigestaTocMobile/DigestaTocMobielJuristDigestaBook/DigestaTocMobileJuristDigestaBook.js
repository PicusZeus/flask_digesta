import TocMobile from "../../../UI/TocMobile/TocMobile";
import DigestaTocMobileJuristDigestaTitulus from "../DigestaTocMobileJuristDigestaTitulus/DigestaTocMobileJuristDigestaTitulus";
import { getTituliAuthor } from "../../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../UI/spinner/Spinner";
import { digestaActions } from "../../../../store/digesta-slice";

const DigestaTocMobileJuristDigestaBook = ({ book_id, author_id }) => {
  const chosenTitulusId = useSelector((state) => state.digesta.chosenTitulusId);
  const dispatch = useDispatch();
let chosenTitulus = false;

  const {
    data: tituli,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["digesta", "tituli", "author", book_id, author_id],
    queryFn: () => getTituliAuthor(book_id, author_id),
    onSuccess: (data) => {
     chosenTitulus = data.filter((t) => t.id === chosenTitulusId)[0];
    }

  });

  const onOptionChangeHandler = (event) => {
    dispatch(digestaActions.setChosenTitulusId(parseInt(event.target.value)));
  };


  if (isSuccess) {
    chosenTitulus = tituli.filter((t) => t.id === chosenTitulusId)[0];
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
