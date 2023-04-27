import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {authActions} from "../../store/auth-slice";
import TokenService from "../../services/token.service";
import NotificationService from "../../services/notification.service";
import {logout, refreshToken} from "../../store/auth-actions";
import tokenService from "../../services/token.service";

const NewComment = (props) => {

    const [commentInput, setCommentInput] = useState('')
    // console.log(commentInput)
    const updatedToken = useSelector(state => state.auth.access_token)
    let user = TokenService.getUser()

    useEffect(() => {
        user = TokenService.getUser()
    }, [updatedToken])
    // console.log(updatedUser, 'UPDATE')

    let token = user?.access_token
    const refresh_token = user?.refresh_token
    // console.log(token)
    const dispatch = useDispatch()
    const [isPrivate, setIsPrivate] = useState(false)
    let repliedId = null
    if (props.repliedId) {
        repliedId = props.repliedId
    }
    const authenticated = user
    const commentedParagraphi = user?.paragraphi
    const par_id = props.paragraphus.id
    const notificationSetter = new NotificationService(dispatch)
    const postCommentHandler = (event, newComment, token) => {
        event.preventDefault()
        // const newComment = event.target[0].value
        console.log(token, "TOKENM")
        const sendComment = async () => {
            console.log('sending')
            const respons = await fetch("http://127.0.0.1:5001/comment/paragraphus/" + par_id,
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
                // dispatch(logout(token))
                throw new Error('unauthorised')

            }

            const data = await respons.json()
            return data
        }

        sendComment().then((response => {

            if (response) {
                // console.log(response, "RESPONSE")
                const data = response
                notificationSetter.setNotificationSuccess("komentarz", "komentarz zamieszczony")
                props.addNewComment(data)
                if (
                    commentedParagraphi.filter((paragraphus) =>
                        paragraphus.id === par_id
                    ).length === 0) {
                    const newParagraphi = [...commentedParagraphi]
                    newParagraphi.push(props.paragraphus)
                    TokenService.updateCommentedParagraphi(newParagraphi)
                    dispatch(authActions.setCommentedParagraphi(newParagraphi))
                }
            }
        })).catch((e) => {
            if (e.message === "unauthorised") {
                // dispatch(refreshToken(refresh_token))
                dispatch(authActions.resetToken())
                TokenService.removeUser()
                notificationSetter.setNotificationError("komentarz", "zaloguj się ponownie jeśli chcesz dodać komentarz")

                // token = tokenService.getLocalAccessToken()
                // postCommentHandler(event, newComment, token)
                // return null
            }
            // console.log(e, 'ERROR')
            else {
                            notificationSetter.setNotificationError("komentarz", "błąd serwera")

            }
        })
    }

    return (
        <li>
            <form method="post" onSubmit={(event) => postCommentHandler(event, commentInput, token)}>
                <label htmlFor="newComment">Nowy komentarz</label>
                <input type="text" id="newComment" value={commentInput}
                       onChange={(event) => setCommentInput(event.target.value)}/>
                <button type="submit" disabled={!authenticated}>wyślij</button>
                <button type="button"
                        onClick={() => setIsPrivate(!isPrivate)}>{isPrivate ? "komentarz prywatny" : "komentarz publiczny"}</button>
            </form>
        </li>
    )
}

export default NewComment