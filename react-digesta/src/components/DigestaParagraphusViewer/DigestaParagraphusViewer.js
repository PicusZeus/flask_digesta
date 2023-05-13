import {json, useLoaderData} from "react-router-dom";
import CommentViewer from "../commentViewer/CommentViewer";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NewComment from "../newComment/NewComment";
import tokenService from "../../services/token.service";
// import {refreshToken} from "../../store/auth-actions";
import NotificationService from "../../services/notification.service";
import classes from "./DigestaParagraphusViewer.module.css"
import {addTags} from "../../services/text.service";
import api from "../../api/api";
import {authActions} from "../../store/auth-slice";







const DigestaParagraphusViewer = (props) => {
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const username = useSelector(state => state.auth.username)
    const [commentsClasses, setCommentsClasses] = useState(classes.hide_comments)

    const dispatch = useDispatch()
    const rerender = useSelector(state => state.ui.rerender)

    const showCommentsLoader = () => {

        if (!showComments) {
            setCommentsClasses(classes.paragraph_comments__items)
        } else {
            setCommentsClasses(classes.hide_comments)
        }
        setShowComments((current) => !current)
    }

    const token = tokenService.getLocalAccessToken()
    const refresh_token = tokenService.getLocalRefreshToken()
    let paragraphus = useLoaderData()
    if (props.paragraphus) {
        paragraphus = props.paragraphus
    }
    let paragraphusKey = null
    if (paragraphus.key !== 'pr') {
        paragraphusKey = paragraphus.key
    }
    const addNewCommentHandler = (newComment) => {
        const newComments = [...comments]
        newComments.push(newComment)


        setComments(newComments)
    }

    let newComment = <li className={classes.paragraph_logout}><h2>Jeśli chcesz dodać komentarz, zaloguj się</h2></li>

    if (username && paragraphus) {
        newComment = <NewComment type="Skomentuj!" paragraphus={paragraphus} addNewComment={addNewCommentHandler}/>
    }


    useEffect(() => {
        const headers = {
            "Content-Type": "application/json"
        }
        if (token !== "EXPIRED" && token) {
            headers['Authorization'] = "Bearer " + token
        }
        const notificationSetter = new NotificationService(dispatch)
        const sendRequest = async () => {
            return await api.get(`comment/paragraphus/${paragraphus.id}`,{
                headers: headers
            })
  
        }
        sendRequest().then((response) => {
            setComments(response.data)

        }).catch((e) => {
            if (e.response.status === 401) {
                dispatch(authActions.resetToken())
                tokenService.removeUser()
            } else {
                notificationSetter.setNotificationError('Błąd', 'Nie udało się załadować komentarzy: błąd serwera')

            }


        })
    }, [token, dispatch, refresh_token, paragraphus, username, rerender])


    const latinText = addTags(paragraphus.text_lat)
    const polText = addTags(paragraphus.text_pl)


    return (
        <>
            {paragraphusKey && <h2>Paragraf {paragraphusKey}</h2>}
            <section className={classes.paragraph_text__container}>
                <div>{latinText}</div>
                <div>{polText}</div>
            </section>
            <section className={classes.paragraph_comments__container}>
                <button onClick={showCommentsLoader}>
                    {showComments ? "schowaj" : "pokaż"} komentarze
                </button>
                <ul className={commentsClasses}>
                    {newComment}
                    {comments && comments.map((comment) => (
                        <CommentViewer key={comment.id}
                                       c_id={comment.id}
                                       paragraphus={paragraphus}
                                       comment={comment}
                                       type="Odpowiedz!"
                                       replies={comment.replies}/>))}

                </ul>
            </section>
        </>

    )
}
export default DigestaParagraphusViewer

export const loader = async ({params, request}) => {
    const id = params.paragraphus_id
    const response = await fetch(process.env.REACT_APP_BASE_API_URL + "digesta/paragraphi/" + id)

    if (!response.ok) {
        throw json(
            {message: 'I messed up even more'},
            {status: 500}
        )
    } else {
        return await response.json()
    }
}

