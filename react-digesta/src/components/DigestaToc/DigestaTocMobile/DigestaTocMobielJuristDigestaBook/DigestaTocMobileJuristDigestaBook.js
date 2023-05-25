import TocMobile from "../../../UI/TocMobile/TocMobile";
import {useState} from "react";
import DigestaTocMobileJuristDigestaTitulus
    from "../DigestaTocMobileJuristDigestaTitulus/DigestaTocMobileJuristDigestaTitulus";
import {getTituliAuthor} from "../../../../api/api";
import {useDispatch} from "react-redux";
import NotificationService from "../../../../services/notification.service";
import {useQuery} from "@tanstack/react-query";
import Spinner from "../../../UI/spinner/Spinner";

const DigestaTocMobileJuristDigestaBook = ({book_id, author_id}) => {
    const [titulusId, setTitulusId] = useState(false)
    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)
    const onOptionChangeHandler = (event) => {
        setTitulusId(event.target.value)
    }

    const { data: tituli, isFetching } = useQuery({
        queryKey: ["digesta", "tituli", "author", book_id, author_id],
        queryFn: () => getTituliAuthor(book_id, author_id),
        onError: () => {notificationSetter.setNotificationError("Błąd ładowania", "Nie udało się załadować tytułów")}
    })

    if (isFetching) {return <Spinner/>}
    return (
        <>
            <TocMobile onOption={onOptionChangeHandler}>

                <option value={''}>Wybierz Tytuł</option>

                {tituli && tituli.map(titulus => (
                    <option key={titulus.id} value={titulus.id}>{titulus.number} {titulus.title_lat}</option>))}
                })}
            </TocMobile>
            {titulusId && <DigestaTocMobileJuristDigestaTitulus author_id={author_id} titulus_id={titulusId}/>}
        </>
    )
}
export default DigestaTocMobileJuristDigestaBook

