import {useDispatch} from "react-redux";
import {useState} from "react";
import {authActions} from "../../store/auth-slice";
import TokenService from "../../services/token.service";
import NotificationService from "../../services/notification.service";
import {refreshToken} from "../../store/auth-actions";
import tokenService from "../../services/token.service";
import {useRef} from "react";
import classes from './NewComment.module.css'

const NewComment = (props) => {


    const newComment = useRef('')
    let user = tokenService.getUserId()


    let token = tokenService.getLocalAccessToken()

    const refresh_token = tokenService.getLocalRefreshToken()
    // console.log(token)
    const dispatch = useDispatch()
    const [isPrivate, setIsPrivate] = useState(false)
    let repliedId = null
    if (props.repliedId) {
        repliedId = props.repliedId
    }
    const authenticated = user
    const commentedParagraphi = tokenService.getCommentedParagraphi()
    const par_id = props.paragraphus.id
    const notificationSetter = new NotificationService(dispatch)
    const postCommentHandler = (event, newComment, token) => {
        event.preventDefault()
        const sendComment = async () => {
            notificationSetter.setNotificationPending('komentarz', 'wysyłam komentarz')
            // console.log('sending')
            const respons = await fetch(process.env.REACT_APP_BASE_API_URL + "comment/paragraphus/" + par_id,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    },
                    body: JSON.stringify({
                        comment: newComment,
                        private: isPrivate,
                        "reply_to_comment_id": repliedId
                    })
                })
            if (respons.status === 401) {
                throw new Error('unauthorised')

            }

            const data = await respons.json()
            return data
        }
        sendComment().then((response => {

            if (response) {
                const data = response
                notificationSetter.setNotificationSuccess("komentarz", "komentarz zamieszczony")
                props.addNewComment(data)
                if (props.onClose) {
                    props.onClose()
                }

                if (
                    commentedParagraphi.filter((paragraphus) =>
                        paragraphus.id === par_id
                    ).length === 0) {
                    const newParagraphi = [...commentedParagraphi]
                    newParagraphi.push(props.paragraphus)
                    TokenService.updateCommentedParagraphi(newParagraphi)
                    dispatch(authActions.setCommentedParagraphi(newParagraphi))

                }
                dispatch(refreshToken(refresh_token))
            }
        })).catch((e) => {
            console.log(e)
            if (e.message === "unauthorised") {
                dispatch(authActions.resetToken())
                TokenService.removeUser()
                notificationSetter.setNotificationError("komentarz", "zaloguj się ponownie jeśli chcesz dodać komentarz")


            } else {
                notificationSetter.setNotificationError("komentarz", "błąd serwera")
            }
        })
    }

    function adjustHeight(event) {
        const el = event.target
        el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight) + "px" : "60px";
    }

    return (
        <li className={classes.new_comment}>
            <form method="post" className={classes.new_comment__container}
                  onSubmit={(event) => postCommentHandler(event, newComment.current.value, token)}>
                <div className={classes.new_comment__header}>
                    <label htmlFor="newComment">{props.type}</label>
                    <button className="material-symbols-outlined" type="submit" disabled={!authenticated}>
                        send
                    </button>

                    <button type="button" className="material-symbols-outlined"
                            onClick={() => setIsPrivate(!isPrivate)}>
                        {isPrivate ? "visibility_off" : "visibility"}
                    </button>
                </div>

                <textarea onKeyUp={adjustHeight} id="newComment" className={classes.new_comment__text} defaultValue={newComment.current.value}
                          ref={newComment}/>

            </form>
        </li>
    )
}

export default NewComment