import classes from "./DigestaTocDesktopJuristDigestaBook.module.css"
import {useEffect, useState} from "react";
import DigestaTocDesktopJuristDigestaTitulus
    from "../DigestaTocDesktopJuristDigestaTitulus/DigestaTocDesktopJuristDigestaTitulus";
import {useDispatch, useSelector} from "react-redux";
import {digestaActions} from "../../../../store/digesta-slice";
import NotificationService from "../../../../services/notification.service";
import {useQuery} from "@tanstack/react-query";
import {getTituli} from "../../../../api/api";
const DigestaTocDesktopJuristDigestaBook = ({book, author_id}) => {

    const [bookMenuOpen, setBookMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)
    const chosenBookId = useSelector(state => state.digesta.chosenBookId)


    const {data: tituli} = useQuery({
        queryKey: ["digesta", "tituli", "author", book.id, author_id],
        queryFn: () => getTituli(book.id, author_id),
        onError: () => {
            notificationSetter.setNotificationError("Błąd sieci", "Nie udało się załadować spisu tytułów dla księgi i jurysty")
        }
    })

    useEffect(() => {
        if (book.id === chosenBookId) {
            setBookMenuOpen(true)
        }
    }, [])

    const openTituliHandler = () => {
        if (!bookMenuOpen) {
            dispatch(digestaActions.setChosenBookId(book.id))
        }
        setBookMenuOpen((current) => !current)
    }

    return (
        <li>
            <button className={classes.main_toc__book}
                    onClick={openTituliHandler}><span className={classes.bookCut}>Księga {book.book_nr}</span>
            </button>
            {bookMenuOpen && <div className={classes.main_toc__tituli}>
                <div>&nbsp;</div>
                <ul className={classes.main_toc__tituli_items}>
                    {
                        tituli.map((titulus) => {
                            const pathApi = process.env.REACT_APP_BASE_API_URL + `digesta/titulus/leges/author/${titulus.id}/${author_id}`
                            return <DigestaTocDesktopJuristDigestaTitulus key={titulus.id}
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