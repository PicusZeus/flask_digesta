import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";
import NotificationService from "../../../../services/notification.service";
import {getLegesAuthor} from "../../../../api/api";
import {useQuery} from "@tanstack/react-query";
import Spinner from "../../../UI/spinner/Spinner";
import {digestaActions} from "../../../../store/digesta-slice";

const DigestaTocMobileJuristDigestaTitulus = ({author_id, titulus_id}) => {
    // const [leges, setLeges] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const notificationSetter = new NotificationService(dispatch)

    const {data: leges, isFetching} = useQuery({
        queryKey: ["digesta", "titulus", "leges", "author", titulus_id, author_id],
        queryFn: () => getLegesAuthor(titulus_id, author_id),
        onError: () => {
            notificationSetter.setNotificationError('Błąd ładowania', 'Nie udało się załadować ustaw')

        }
    })
    if (isFetching) {return <Spinner/>}


    const onOptionChangeLexHandler = (event) => {
        dispatch(digestaActions.setChosenTitulusId(event.target.value))
        navigate("/jurysci/digesta/" + author_id + "/" + event.target.value)

    }

    return (


        <TocMobile onOption={onOptionChangeLexHandler}>

            <option value={''}>Wybierz ustawę</option>

            {leges && leges.map(lex => (<option key={lex.id} value={lex.id}>{lex.lex_nr}</option>))}

        </TocMobile>


    )
}

export default DigestaTocMobileJuristDigestaTitulus