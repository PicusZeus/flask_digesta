import {useDispatch} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import {useNavigate} from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";
import NotificationService from "../../../../services/notification.service";
import {getLeges} from "../../../../api/api";
import {useQuery} from "@tanstack/react-query";
import Spinner from "../../../UI/spinner/Spinner";

const DigestaTocMobileTitulus = ({id}) => {
    // const [leges, setLeges] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const notificationSetter = new NotificationService(dispatch)


    const {data: leges, isFetching} = useQuery({
        queryKey: ["digesta", "titulus", "leges", id],
        queryFn: () => getLeges(id),
        onError: () => {
            notificationSetter.setNotificationError('Ładowanie tytułu', 'Błąd Servera')

        }
    })


    const onOptionChangeLexHandler = (event) => {
        dispatch(digestaActions.setChosenLexId(parseInt(event.target.value)))
        navigate(event.target.value)

    }
    if (isFetching) {
        return <Spinner/>
    }

    return (


        <TocMobile onOption={onOptionChangeLexHandler}>

            <option value={''}>Wybierz ustawę</option>

            {leges && leges.map(lex => (<option key={lex.id} value={lex.id}>{lex.lex_nr}</option>))}

        </TocMobile>


    )
}

export default DigestaTocMobileTitulus