import classes from "./DigestaTocDesktopJuristDigestaBook.module.css"
import {useState} from "react";
import DigestaTocDesktopJuristDigestaTitulus
    from "../DigestaTocDesktopJuristDigestaTitulus/DigestaTocDesktopJuristDigestaTitulus";
import {useDispatch, useSelector} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import NotificationService from "../../../../services/notification.service";
import {useQuery} from "@tanstack/react-query";
import {getTituliAuthor} from "../../../../api/api";
import Spinner from "../../../UI/spinner/Spinner";

const DigestaTocDesktopJuristDigestaBook = ({book, author_id}) => {
    const chosenBookId = useSelector(state => state.digesta.chosenBookId)
    const [bookMenuOpen, setBookMenuOpen] = useState(chosenBookId === book.id)
    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)



    const {data: tituli, isFetching} = useQuery({
        queryKey: ["digesta", "tituli", "author", book.id, author_id],
        queryFn: () => getTituliAuthor(book.id, author_id),
        onError: () => {
            notificationSetter.setNotificationError("Błąd sieci", "Nie udało się załadować spisu tytułów dla księgi i jurysty")
        },
        initialData: []
    })
    if (isFetching) {return <Spinner/>}


    const openTituliHandler = () => {
        if (!bookMenuOpen) {
            dispatch(digestaActions.setChosenBookId(book.id))
        }
        setBookMenuOpen((current) => !current)
    }


    return (
        <li>
            <button className={classes.main_toc__book}
                    onClick={openTituliHandler}><span className={classes.bookCut}>Liber {book.book_nr}</span>
            </button>
            {bookMenuOpen && <div className={classes.main_toc__tituli}>
                <div>&nbsp;</div>
                <ul className={classes.main_toc__tituli_items}>
                    {
                        tituli.map((titulus) => {
                            const pathApi = process.env.REACT_APP_BASE_API_URL + `digesta/titulus/leges/author/${titulus.id}/${author_id}`
                            return <DigestaTocDesktopJuristDigestaTitulus
                                                                          key={titulus.id}
                                                                          pathLex={`/jurysci/digesta/${author_id}/`}
                                                                          pathApi={pathApi} titulus={titulus}
                                                                          author_id={author_id}/>
                        })}
                </ul>
            </div>}
        </li>
    )
}

export default DigestaTocDesktopJuristDigestaBook