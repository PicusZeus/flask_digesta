import classes from "./DigestaLookUp.module.css";
import DigestaSearch from "../../components/DigestaSearch/DigestaSearch";
import DigestaTocSearchParagraphs
    from "../../components/DigestaToc/DigestaTocSearchParagraphs/DigestaTocSearchParagraphs";
import {useDispatch, useSelector} from "react-redux";
import NotificationService from "../../services/notification.service";
import {digestaActions} from "../../store/digesta-slice";
import api from "../../api/api";

const DigestaLookUp = () => {

    const lang = useSelector(state=>state.digesta.lang)
    const foundParagraphi = useSelector(state=>state.digesta.foundParagraphi)
    const searchedTerm = useSelector(state=>state.digesta.searchedTerm)
    const dispatch = useDispatch()

    const notificationSetter = new NotificationService(dispatch)

    const getDataHandler = (event) => {
        event.preventDefault()
        const searched_term = event.target[1].value

        if (searched_term.length < 3) {
            notificationSetter.setNotificationSuccess("wyszukiwanie", "wpisane słowo musi mieć co najmniej 3 znaki")
            return false
        }
        const loadData = async (searched_term, lang) => {

            return await api.post(`digesta/${lang}`, {
                searched_term: searched_term
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

        }

        loadData(searched_term, lang).then((response) => {
            if (response.data.length > 0) {
                notificationSetter.setNotificationSuccess("Sukces!", `Znaleziono ${response.data.length} wystąpień` )
                dispatch(digestaActions.setFoundParagraphi(response.data))
                dispatch(digestaActions.setSearchedTerm(searched_term))

            } else {
                notificationSetter.setNotificationError("Błąd", "Nie znaleziono niczego")
            }

        }).catch((e) => {
            notificationSetter.setNotificationError("Błąd", "Błąd serwera")
        })

    }


    return (
        <div className={classes.main_lookup}>


            <h1 className={classes.main_lookup__title}>Wyszukaj tekst w Digestach</h1>
            <h4 className={classes.main_lookup__subtitle}>Wyszukiwany tekst musi składać się z co najmniej 3 znaków. Wielkość liter jest ignorowana.</h4>


            <form className={classes.search_form} onSubmit={getDataHandler}>
                <DigestaSearch/>

            </form>

            {foundParagraphi && <DigestaTocSearchParagraphs paragraphi={foundParagraphi} lang={lang}
                                                       searchedTerm={searchedTerm}/>}
        </div>
    )
}

export default DigestaLookUp
