import {json, useLoaderData} from "react-router-dom";
import CommentViewer from "../commentViewer/CommentViewer";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NewComment from "../newComment/NewComment";
import tokenService from "../../services/token.service";
import {refreshToken} from "../../store/auth-actions";
import NotificationService from "../../services/notification.service";
import classes from "./DigestaParagraphusViewer.module.css"

const DigestaParagraphusViewer = (props) => {
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const username = useSelector(state => state.auth.username)

    const dispatch = useDispatch()
    const rerender = useSelector(state => state.ui.rerender)

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

    const headers = useMemo(() => (
        {"Content-Type": "application/json"}

    ), [username])
    console.log(headers, token, 'HEADERS')

    useEffect(() => {
        if (token !== "EXPIRED" && token) {
            headers['Authorization'] = "Bearer " + token
        }
        const notificationSetter = new NotificationService(dispatch)
        const sendRequest = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "comment/paragraphus/" + paragraphus.id, {
                headers: headers
            });

            if (response.status === 401) {
                dispatch(refreshToken(refresh_token))
                return null

            } else if (response.ok) {
                const data = await response
                return data.json()
            } else {
                throw new Error('error')
            }
        }
        sendRequest().then((response) => {
            if (response) {

                setComments(response)
            }
        }).catch((e) => {
            notificationSetter.setNotificationError('Komentarze', 'Nie udało się załadować komentarzy')


        })
    }, [token, dispatch, refresh_token, paragraphus, headers, username, rerender])

    return (
        <>
            {paragraphusKey && <h2>Paragraf {paragraphusKey}</h2>}
            <section className={classes.paragraph_text__container}>
                <div>{paragraphus.text_lat}</div>
                <div>{paragraphus.text_pl}</div>
            </section>
            <section className={classes.paragraph_comments__container}>
                <button onClick={() => setShowComments(!showComments)}>
                    {showComments ? "schowaj" : "pokaż"} komentarze
                </button>
                {showComments && <ul className={classes.paragraph_comments__items}>
                    {newComment}
                    {comments && comments.map((comment) => (
                        <CommentViewer key={comment.id}
                                       c_id={comment.id}
                                       paragraphus={paragraphus}
                                       comment={comment}
                                       type="Odpowiedz!"
                                       replies={comment.replies}/>))}

                </ul>}
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

