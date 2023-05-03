import classes from "./DigestaLookUp.module.css";
import DigestaSearch from "../../components/DigestaSearch/DigestaSearch";
import DigestaTocSearchParagraphs
    from "../../components/DigestaToc/DigestaTocSearchParagraphs/DigestaTocSearchParagraphs";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {uiActions} from "../../store/ui-slice";

const DigestaLookUp = () => {

    const [foundLeges, setFoundLeges] = useState([])
    const [lang, setLang] = useState('lat')
    const [searched_term, setSearched_term] = useState('')

    const dispatch = useDispatch()
    const getDataHandler = (event) => {
        event.preventDefault()
        const searched_term = event.target[1].value
        const lang = event.target[2].value
        if (searched_term.length < 3) {
            dispatch(uiActions.setNotification({
                status: "error",
                title: "wyszukiwanie",
                message: "wpisane słowo musi mieć co najmniej 3 znaki"
            }))
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
                dispatch(uiActions.setNotification({
                    status: "success", title: "Wyszukiwanie", message: `Znaleziono ${response.length} wystąpień`
                }))

                setFoundLeges((current) => response)
                setLang(lang)
                setSearched_term(searched_term)


            } else {
                dispatch(uiActions.setNotification({
                    status: "error", title: "Wyszukiwanie", message: "Nie znaleziono niczego"
                }))
            }

            // const data = JSON.parse(response)


        }).catch((e) => {
            dispatch(uiActions.setNotification({
                status: "error", title: "Wyszukiwanie", message: "Błąd serwera"
            }))
        })

    }


    return (
        <div className={classes.main_lookup}>


            <h1 className={classes.main_lookup__title}>Wyszukaj tekst w Digestach</h1>


            <form onSubmit={getDataHandler}>
                <DigestaSearch/>

            </form>

            {foundLeges && <DigestaTocSearchParagraphs paragraphi={foundLeges} lang={lang}
                                                       searchedTerm={searched_term}/>}
        </div>
    )
}

export default DigestaLookUp
