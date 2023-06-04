import classes from "./DigestaLookUp.module.css";
import DigestaSearch from "../../components/DigestaSearch/DigestaSearch";
import DigestaTocSearchParagraphs
    from "../../components/DigestaToc/DigestaTocSearchParagraphs/DigestaTocSearchParagraphs";
import {useDispatch, useSelector} from "react-redux";
import NotificationService from "../../services/notification.service";
import {digestaActions} from "../../store/digesta-slice";
import {getSearchedParagraphi} from "../../api/api";
import {useState} from "react";
import Spinner from "../../components/UI/spinner/Spinner";
import {useMutation} from "@tanstack/react-query";

const DigestaLookUp = () => {
    const [spinner, setSpinner] = useState(false);
    const lang = useSelector((state) => state.digesta.lang);
    const foundParagraphi = useSelector((state) => state.digesta.foundParagraphi);
    const searchedTerm = useSelector((state) => state.digesta.searchedTerm);
    const dispatch = useDispatch();
    const notificationSetter = new NotificationService(dispatch);


    const {mutate} = useMutation(
        ({searchedTerm, lang}) => getSearchedParagraphi(searchedTerm, lang),
        {
            onMutate: () => {
                notificationSetter.setNotificationPending("Wysłano zapytanie", "Trwa wyszukiwanie")
                setSpinner(true)
            },
            onSuccess: (data) => {
                dispatch(digestaActions.setFoundParagraphi(data));
                dispatch(digestaActions.setSearchedTerm(searchedTerm));
            },
            onSettled: (data) => {
                notificationSetter.setNotificationSuccess(
                    "Sukces!",
                    `Znaleziono ${data.length} wystąpień`
                );
                setSpinner(false)
            },
            onError: () => {
                notificationSetter.setNotificationError(
                    "Błąd",
                    "Nie znaleziono niczego"
                );
            }

        }
    )

    const getDataHandler = (event, v) => {
        event.preventDefault();
        const searchedTerm = v

        if (searchedTerm.length < 1) {
            notificationSetter.setNotificationSuccess(
                "wyszukiwanie",
                "wpisane słowo musi mieć co najmniej 3 znaki"
            );
            return false;
        } else {
        mutate({searchedTerm, lang})

        }
    }




    return (
        <div className={classes.main_lookup}>
            <h1 className={classes.main_lookup__title}>Wyszukaj tekst w Digestach</h1>
            <h4 className={classes.main_lookup__subtitle}>
                Wyszukiwany tekst musi składać się z co najmniej 3 znaków. Wielkość
                liter jest ignorowana.
            </h4>

            <form className={classes.search_form} onSubmit={getDataHandler}>
                <DigestaSearch onClick={getDataHandler}/>
            </form>
            {spinner && <Spinner/>}
            {foundParagraphi && (
                <DigestaTocSearchParagraphs
                    paragraphi={foundParagraphi}
                    lang={lang}
                    searchedTerm={searchedTerm}
                />
            )}
        </div>
    );
};

export default DigestaLookUp;
