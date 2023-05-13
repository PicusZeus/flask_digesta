import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import NewComment from "../newComment/NewComment";
import tokenService from "../../services/token.service";
import NotificationService from "../../services/notification.service";

import {logout, refreshToken} from "../../store/auth-actions";
import {authActions} from "../../store/auth-slice";
import {uiActions} from "../../store/ui-slice";
import Confirmation from "../UI/confirmation/Confirmation";
import classes from './CommentViewer.module.css'
import api from "../../api/api";

const CommentViewer = ({comment, replies, c_id, paragraphus}) => {
    const [likes, setLikes] = useState(comment.likes.length)
    const user_id = tokenService.getUserId()
    const [liked, setLiked] = useState(false)
    const rerender = useSelector(state=>state.ui.rerender)
    // console.log(rerender)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [editOn, setEditOn] = useState(false)
    const dispatch = useDispatch()
    const [myReplies, setMyReplies] = useState(replies)

    const comment_id = comment.id
    const [isReplying, setIsReplaying] = useState(false)
    const token = tokenService.getLocalAccessToken()
    const refresh_token = tokenService.getLocalRefreshToken()

    const commentText = useRef(comment)

    useEffect(() => {
        if (comment.likes.filter(like => (like.user_id === parseInt(user_id))).length > 0) {
            setLiked(true)
        }
    }, [comment.likes, user_id])


    const addReplyHandler = (reply) => {
        const newReplies = [...myReplies]

        newReplies.push(reply)
        setMyReplies(newReplies)
    }

    const notificationSetter = new NotificationService(dispatch)


    const SaveEditedCommentHandler = (comment_id, token, newText) => {
        // console.log(user_id, newText.current.value, token)

        const sendRequest = async () => {
            return await api.put(`comment/${comment_id}`,
                {
                    comment: newText.current.value
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
        }

        sendRequest().then((response) => {
            notificationSetter.setNotificationSuccess("komentarz", "komentarz został zmodyfikowany")
            dispatch(refreshToken(refresh_token))
            setEditOn(false)

        }).catch((e) => {
            if (e.response.status === 403) {
                dispatch(logout(token))
                notificationSetter.setNotificationError("Błąd", "Błąd autoryzacji: zaloguj się ponownie")
            } else {
                notificationSetter.setNotificationError("Błąd", "Błąd serwera")
            }

        })
    }


    const deleteCommentHandler = (comment_id, token) => {
        const sendRequest = async () => {
            return await api.delete(`comment/${comment_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
        }


        sendRequest().then((response) => {
            notificationSetter.setNotificationSuccess("Sukces", "komentarz usunięty")
            dispatch(authActions.setCommentedParagraphi(response.data.commentedParagraphi))
            setDeleteDialog(false)
            tokenService.updateCommentedParagraphi(response.data.commentedParagraphi)
            dispatch(uiActions.rerender())
            dispatch(refreshToken(refresh_token))

        }).catch((e) => {
            if (e.response.status === 403) {
                dispatch(logout(token))
                notificationSetter.setNotificationError("Błąd", "Błąd autoryzacji")
            } else {
                notificationSetter.setNotificationError("Błąd", "Błąd serwera")

            }

        })

    }

    const onLikedHandler = (token) => {
        if (liked) {
            setLiked(false)
            setLikes((current) => current - 1)
        } else {
            setLiked(true)
            setLikes((current) => current + 1)
        }
        const likeComment = async () => {

            return await api.post("like", {
                comment_id: comment_id
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
        }
        if (token) {
            likeComment().then(
                // notificationSetter.setNotificationSuccess("Sukces", "Komentarz polubiony")
            ).catch((e) =>
                notificationSetter.setNotificationError("Błąd", "Błąd autoryzacji"))
        }


    }

    const date = new Date(comment.date)

    const timeLocal = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
    const leadingZero = (num) => `0${num}`.slice(-2);
    const hour = [timeLocal.getHours(), timeLocal.getMinutes()].map((t) => leadingZero(t)).join(':')
    const day = [timeLocal.getDate(), timeLocal.getMonth() + 1, timeLocal.getFullYear()].map(t => leadingZero(t)).join('.')
    const commentCreated = `${day} ${hour}`

    function adjustHeight(event) {
        const el = event.target
        el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight) + "px" : "60px";
    }

    return (<>
        {deleteDialog && <Confirmation cancelAction={() => setDeleteDialog(false)} title="" message=""
                                       confirmAction={() => deleteCommentHandler(c_id, token)}/>}
        <li className={classes.comment_item}>
            <div className={classes.comment_item__header}>
                <div className={classes.comment_item__header_info}>
                    <label htmlFor="comment">{comment.user.username}</label>
                    <data>{commentCreated}</data>

                </div>

            </div>

            <div className={classes.comment_item__container}>
                <textarea ref={commentText} onKeyUp={adjustHeight}
                          className={classes.comment_item__text} id="comment"
                          disabled={!editOn} defaultValue={comment.comment}></textarea>
                <div className={classes.comment_item__actions}>
                    <div className={classes.comment_item__icons}>
                        {comment.private && <button className="material-symbols-outlined">visibility_lock</button>}

                        <button onClick={() => onLikedHandler(token)} disabled={!user_id}
                                className="material-symbols-outlined">
                            {!liked ? "favorite" : "heart_check"}<span className={classes.likes_num}>{likes}</span>
                        </button>
                        <button onClick={() => setIsReplaying(!isReplying)} disabled={!user_id}
                                className="material-symbols-outlined"> reply
                        </button>
                        <button className="material-symbols-outlined"
                                onClick={() => SaveEditedCommentHandler(comment_id, token, commentText)}
                                disabled={!editOn}>
                            save
                        </button>
                        <button onClick={() => setEditOn(!editOn)} className="material-symbols-outlined"
                                disabled={user_id !== comment.user.id.toString()}>
                            edit
                        </button>
                        <button className="material-symbols-outlined" onClick={() => setDeleteDialog(true)}
                                disabled={user_id !== comment.user.id.toString()}>delete_forever
                        </button>
                    </div>


                    {isReplying && <NewComment type="Odpowiedz!" onClose={() => setIsReplaying(false)}
                                               paragraphus={paragraphus}
                                               repliedId={comment_id}
                                               addNewComment={addReplyHandler}/>}
                </div>
            </div>
            <ul className={classes.comment_item__replies}>


                {myReplies.map((reply) => (<CommentViewer key={reply.id}
                                                          c_id={reply.id}
                                                          paragraphus={paragraphus}
                                                          comment={reply}
                                                          type="Odpowiedz!"
                                                          replies={reply.replies}
                />))}

            </ul>

        </li>
    </>)
}

export default CommentViewer