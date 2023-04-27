import {useEffect, useState} from "react";
import NewComment from "../newComment/NewComment";
import tokenService from "../../services/token.service";
import NotificationService from "../../services/notification.service";
import {useDispatch} from "react-redux";
import {refreshToken} from "../../store/auth-actions";
import {authActions} from "../../store/auth-slice";
import TokenService from "../../services/token.service";
import {redirect} from "react-router-dom";
import {uiActions} from "../../store/ui-slice";
import Confirmation from "../UI/confirmation/Confirmation";

const CommentViewer = (props) => {

    const [deleteDialog, setDeleteDialog] = useState(false)
    // const replies = props.replies
    const dispatch = useDispatch()
    const [replies, setReplies] = useState([])
    const comment = props.comment
    const comment_id = comment.id
    const [isReplying, setIsReplaying] = useState(false)
    const props_replies = props.replies
    const user = tokenService.getUser()

    console.log(comment.user.id, 'DANME MN', user?.user_id)
    const token = user?.access_token
    const refresh_token = user?.refresh_token
    const user_id = user?.user_id

    useEffect(() => {
        if (props_replies) {
            setReplies(props_replies)
        }
    }, [props_replies])

    // console.log("NEW", comment)
    const addReplyHandler = (reply) => {
        const newReplies = [...replies]

        newReplies.push(reply)
        setReplies(newReplies)
    }

    const notificationSetter = new NotificationService(dispatch)

    const deleteCommentHandler = (comment_id, token) => {
        const deleteComment = async () => {
            const response = await fetch("http://127.0.0.1:5001/comment/" + comment_id, {
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
                } else if (response.status === 204) {
                    notificationSetter.setNotificationError("komentarz", "błąd autoryzacji")


                }
            }
        ).catch((e) => {
            if (e.message === "unauthorised")
                // console.log(e)
                // dispatch(refreshToken(refresh_token))
                // token = tokenService.getLocalAccessToken()
                // deleteCommentHandler(token)
            {
                dispatch(authActions.resetToken())
                TokenService.removeUser()
                notificationSetter.setNotificationError("komentarz", "zaloguj się ponownie")
            } else {
                notificationSetter.setNotificationError("komentarz", "błąd serwera")

            }

        })

    }

    // console.log(props.paragraphus, 'IN VIEWER')
    return (

        <li>
            {deleteDialog && <Confirmation cancelAction={() => setDeleteDialog(false)} title="" message=""
                                           confirmAction={() => deleteCommentHandler(props.c_id, token)}/>}
            <ul>
                <textarea defaultValue={comment.comment}/>
                <button onClick={() => setIsReplaying(!isReplying)}>odpowiedz</button>
                {user && user.user_id === comment.user.id &&
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