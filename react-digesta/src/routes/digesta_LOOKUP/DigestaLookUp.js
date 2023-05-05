import classes from "./DigestaLookUp.module.css";
import DigestaSearch from "../../components/DigestaSearch/DigestaSearch";
import DigestaTocSearchParagraphs
    from "../../components/DigestaToc/DigestaTocSearchParagraphs/DigestaTocSearchParagraphs";
import {useDispatch, useSelector} from "react-redux";
import NotificationService from "../../services/notification.service";
import {digestaActions} from "../../store/digesta-slice";
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

            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "digesta/" + lang, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    searched_term: searched_term
                })
            })
            if (!response.ok) {
                throw new Error()

            } else {
                const data = await response.json()
                return data
            }

        }

        loadData(searched_term, lang).then((response) => {
            if (response.length > 0) {
                notificationSetter.setNotificationSuccess("Wyszukiwanie", `Znaleziono ${response.length} wystąpień` )
                console.log(response)
                dispatch(digestaActions.setFoundParagraphi(response))
                dispatch(digestaActions.setSearchedTerm(searched_term))

            } else {
                notificationSetter.setNotificationError("Wyszukiwanie", "Nie znaleziono niczego")
            }

        }).catch((e) => {
            notificationSetter.setNotificationError("Wyszukiwanie", "Błąd serwera")
        })

    }


    return (
        <div className={classes.main_lookup}>


            <h1 className={classes.main_lookup__title}>Wyszukaj tekst w Digestach</h1>


            <form className={classes.search_form} onSubmit={getDataHandler}>
                <DigestaSearch/>

            </form>

            {foundParagraphi && <DigestaTocSearchParagraphs paragraphi={foundParagraphi} lang={lang}
                                                       searchedTerm={searchedTerm}/>}
        </div>
    )
}

export default DigestaLookUp
