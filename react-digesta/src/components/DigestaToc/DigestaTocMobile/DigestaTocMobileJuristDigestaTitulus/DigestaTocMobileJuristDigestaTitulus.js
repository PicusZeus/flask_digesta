// import classes from "../DigestaTocMobileBook/DigestaTocMobileBook.module.css";
import {useDispatch} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import {useNavigate} from "react-router-dom";
import TocMobile from "../../../UI/TocMobile/TocMobile";
import {useState} from "react";
import {useEffect} from "react";
// import NotificationService from "../../../../services/notification.service";
import NotificationService from "../../../../services/notification.service";
const DigestaTocMobileJuristDigestaTitulus = ({author_id, titulus_id}) => {
    const [leges, setLeges] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        const notificationSetter = new NotificationService(dispatch)
        const urlLoadLegesData = process.env.REACT_APP_BASE_API_URL + `digesta/titulus/leges/author/${titulus_id}/${author_id}`

        const sendRequest = async () => {
            const response = await fetch(urlLoadLegesData)
            return await response.json()

        }
        sendRequest().then((response) => {


            setLeges(response)
        }).catch((e) => {
            notificationSetter.setNotificationError('Ładowanie tytułu', 'Błąd Servera')
        })
    }, [author_id, dispatch, titulus_id])

    const onOptionChangeLexHandler = (event) => {
        // dispatch(digestaActions.setChosenLexId(parseInt(event.target.value)))
        navigate("/jurysci/digesta/" + author_id + "/" + event.target.value)

    }
    // let leges = props.leges
    // if (leges) {
    //     leges = props.leges.leges
    // }
    return (
        <>


            <TocMobile onOption={onOptionChangeLexHandler}>

                <option value={''}>Wybierz ustawę</option>

                {leges.map(lex => (<option key={lex.id} value={lex.id}>{lex.lex_nr}</option>))}

            </TocMobile>




        </>
    )
}

export default DigestaTocMobileJuristDigestaTitulus