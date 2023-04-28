import {useEffect, useState} from "react";
import NewComment from "../newComment/NewComment";
import tokenService from "../../services/token.service";
import NotificationService from "../../services/notification.service";
import {useDispatch} from "react-redux";
import {logout, refreshToken} from "../../store/auth-actions";
import {authActions} from "../../store/auth-slice";
import {uiActions} from "../../store/ui-slice";
import Confirmation from "../UI/confirmation/Confirmation";

const CommentViewer = (props) => {

    const [deleteDialog, setDeleteDialog] = useState(false)
    const dispatch = useDispatch()
    const [replies, setReplies] = useState([])
    const comment = props.comment
    const comment_id = comment.id
    const [isReplying, setIsReplaying] = useState(false)
    const props_replies = props.replies
    const user_id = tokenService.getUserId()

    const token = tokenService.getLocalAccessToken()
    const refresh_token = tokenService.getLocalRefreshToken()


    useEffect(() => {
        if (props_replies) {
            setReplies(props_replies)
        }
    }, [props_replies])

    const addReplyHandler = (reply) => {
        const newReplies = [...replies]

        newReplies.push(reply)
        setReplies(newReplies)
    }

    const notificationSetter = new NotificationService(dispatch)

    const deleteCommentHandler = (comment_id, token) => {
        const deleteComment = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "comment/" + comment_id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            })
            if (response.status === 401) {
                throw new Error('unauthorized')
            }

            const data = await response.json()
            return data
        }

        deleteComment().then(
            (response) => {
                if (response.status === 200) {
                    notificationSetter.setNotificationSuccess("komentarz", "komentarz usunięty")
                    dispatch(uiActions.rerender())
                    const commentedParagraphi = response.commentedParagraphi
                    dispatch(authActions.setCommentedParagraphi(commentedParagraphi))
                    tokenService.updateCommentedParagraphi(commentedParagraphi)
                    dispatch(refreshToken(refresh_token))
                } else if (response.status === 204) {
                    notificationSetter.setNotificationError("komentarz", "błąd autoryzacji")
                }
            }
        ).catch((e) => {
            if (e.message === "unauthorised")

            {
                dispatch(logout(token))
                notificationSetter.setNotificationError("komentarz", "zaloguj się ponownie")
            } else {
                notificationSetter.setNotificationError("komentarz", "błąd serwera")

            }

        })

    }

    return (

        <li>
            {deleteDialog && <Confirmation cancelAction={() => setDeleteDialog(false)} title="" message=""
                                           confirmAction={() => deleteCommentHandler(props.c_id, token)}/>}
            <ul>
                <textarea defaultValue={comment.comment}/>
                <button onClick={() => setIsReplaying(!isReplying)}>odpowiedz</button>
                <h2>{user_id} {comment.user.id}</h2>
                {parseInt(user_id) === comment.user.id &&
                    <button onClick={() => setDeleteDialog(true)}>usuń</button>}
                {isReplying && <NewComment paragraphus={props.paragraphus}
                                           repliedId={comment_id}
                                           addNewComment={addReplyHandler}/>}


                {replies.map((reply) => (<CommentViewer key={reply.id}
                                                        c_id={reply.id}
                                                        paragraphus={props.paragraphus}
                                                        comment={reply}
                                                        replies={reply.replies}
                />))}

            </ul>

        </li>
    )
}

export default CommentViewer