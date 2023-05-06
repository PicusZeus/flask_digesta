import {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch} from "react-redux";

import NewComment from "../newComment/NewComment";
import tokenService from "../../services/token.service";
import NotificationService from "../../services/notification.service";

import {logout, refreshToken} from "../../store/auth-actions";
import {authActions} from "../../store/auth-slice";
import {uiActions} from "../../store/ui-slice";
import Confirmation from "../UI/confirmation/Confirmation";
import classes from './CommentViewer.module.css'
import {current} from "@reduxjs/toolkit";

const CommentViewer = (props) => {
    const [likes, setLikes] = useState(props.comment.likes.length)
    const user_id = tokenService.getUserId()
    // console.log(user_id, props.comment.likes, )
    const [liked, setLiked] = useState(false)
    useEffect(()=>{
        // console.log(props.comment.likes.filter(like=>(like.user_id === parseInt(user_id))))
        if (props.comment.likes.filter(like=>(like.user_id === parseInt(user_id))).length > 0)
        {
            setLiked(true)
            // console.log('TRUE', comment)
        }
    }, [props.comment.likes, user_id])
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [editOn, setEditOn] = useState(false)
    const dispatch = useDispatch()
    const [replies, setReplies] = useState([])
    const comment = props.comment
    const comment_id = comment.id
    const [isReplying, setIsReplaying] = useState(false)
    const props_replies = props.replies


    const token = tokenService.getLocalAccessToken()
    const refresh_token = tokenService.getLocalRefreshToken()

    const commentText = useRef(comment)
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


    const SaveEditedCommentHandler = (comment_id, token, newText) => {
        // console.log(user_id, newText.current.value, token)

        const editComment = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "comment/" + comment_id, {
                method: "PUT", headers: {
                    "Content-Type": "application/json", Authorization: "Bearer " + token
                },
                body: JSON.stringify({

                    "comment": newText.current.value

                })
            })
            if (response.status === 401) {
                throw new Error('unauthorized')
            }

            const data = await response.json()
            return data
        }

        editComment().then((response) => {
            if (response.status === 200) {
                notificationSetter.setNotificationSuccess("komentarz", "komentarz został zmodyfikowany")

                dispatch(refreshToken(refresh_token))
            } else if (response.status === 204) {
                notificationSetter.setNotificationError("komentarz", "błąd autoryzacji")
            }
        }).catch((e) => {
            if (e.message === "unauthorised") {
                dispatch(logout(token))
                notificationSetter.setNotificationError("komentarz", "zaloguj się ponownie")
            } else {
                notificationSetter.setNotificationError("komentarz", "błąd serwera")

            }

        })

    }


    const deleteCommentHandler = (comment_id, token) => {
        const deleteComment = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "comment/" + comment_id, {
                method: "DELETE", headers: {
                    "Content-Type": "application/json", Authorization: "Bearer " + token
                }
            })
            if (response.status === 401) {
                throw new Error('unauthorized')
            }

            const data = await response.json()
            return data
        }

        deleteComment().then((response) => {
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
        }).catch((e) => {
            if (e.message === "unauthorised") {
                dispatch(logout(token))
                notificationSetter.setNotificationError("komentarz", "zaloguj się ponownie")
            } else {
                notificationSetter.setNotificationError("komentarz", "błąd serwera")

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
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + 'like', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", Authorization: "Bearer " + token

                    },
                body: JSON.stringify({
                    comment_id: comment.id
                })
                }
            )

            return response;
        }
        if (token) {
            likeComment().then((response) =>
                console.log('success')
            ).catch((e) =>
                console.log(e))
        }


    }

    const date = new Date(comment.date)
    const leadingZero = (num) => `0${num}`.slice(-2);
    const hour = [date.getHours(), date.getMinutes()].map((t) => leadingZero(t)).join(':')
    const day = [date.getDay(), date.getMonth(), date.getFullYear()].map(t => leadingZero(t)).join('.')
    const commentCreated = `${day} ${hour}`

    // console.log(commentCreated)
    function adjustHeight(event) {
        const el = event.target
        el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight) + "px" : "60px";
    }

    console.log(comment)
    return (<>
        {deleteDialog && <Confirmation cancelAction={() => setDeleteDialog(false)} title="" message=""
                                       confirmAction={() => deleteCommentHandler(props.c_id, token)}/>}
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
                                               paragraphus={props.paragraphus}
                                               repliedId={comment_id}
                                               addNewComment={addReplyHandler}/>}
                </div>
            </div>
            <ul className={classes.comment_item__replies}>


                {replies.map((reply) => (<CommentViewer key={reply.id}
                                                        c_id={reply.id}
                                                        paragraphus={props.paragraphus}
                                                        comment={reply}
                                                        type="Odpowiedz!"
                                                        replies={reply.replies}
                />))}

            </ul>

        </li>
    </>)
}

export default CommentViewer