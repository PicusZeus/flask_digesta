import {useDispatch} from "react-redux";
import {useState} from "react";
import {authActions} from "../../store/auth-slice";
import TokenService from "../../services/token.service";
import NotificationService from "../../services/notification.service";
import {refreshToken} from "../../store/auth-actions";
import tokenService from "../../services/token.service";
import {useRef} from "react";
import classes from './NewReply.module.css'
import api from "../../api/api";
import {useMutation} from "@tanstack/react-query";

const NewReply = ({paragraphus_id, onUpdate, onClose, paragraphus, repliedId, type, username, queryClient}) => {
    console.log(repliedId, paragraphus_id, 'REPL')
    const [isPrivate, setIsPrivate] = useState(false)
    const newComment = useRef('')

    const user = tokenService.getUserId()
    const token = tokenService.getLocalAccessToken()
    const refresh_token = tokenService.getLocalRefreshToken()
    const commentedParagraphi = tokenService.getCommentedParagraphi()





    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)


    const postComment = ({newComment, isPrivate, repliedId}) => {
        console.log(newComment, isPrivate, repliedId, token, 'tutaj')
        return api.post(`comment/paragraphus/${paragraphus_id}`, {
            comment: newComment,
            private: isPrivate,
            "reply_to_comment_id": repliedId
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data, 'response')

                return response.data
            })
            .catch((e) => {
                console.log('error', e, paragraphus_id)
            })
    }


    const mutation = useMutation({
        mutationFn: ({newComment, isPrivate, repliedId}) => postComment({newComment, isPrivate, repliedId}),
        onMutate: ()=> {notificationSetter.setNotificationPending('Trwa wysyłanie komentarza', 'Czekamy na odpowiedź')},
        onSuccess: newComment => {
            notificationSetter.setNotificationSuccess("Sukces", "Komentarz zamieszczony")
            // if (paragraphus_id > 0)
            // console.log(newComment, 'new', paragraphus)
            // {updateCommentedParagrahi(paragraphus)}
            if (onUpdate) {onUpdate(7678)}
            queryClient.invalidateQueries(["comment", "comments",  username, repliedId], {exact: true})
        },
        onError: (e)=> {
            if (e.response.status === 401) {

                dispatch(authActions.resetToken())
                TokenService.removeUser()
                notificationSetter.setNotificationError("Błąd autoryzacji", "zaloguj się ponownie jeśli chcesz dodać komentarz")
            }
            notificationSetter.setNotificationError("Błąd", "Nie udało się zamieścić komentarza")
        }

    })

    const postCommentHandler = (e, newComment) => {
        e.preventDefault()
        mutation.mutate({
            newComment: newComment,
            isPrivate: isPrivate,
            repliedId: repliedId,
        })
        onClose()



    }

    const updateCommentedParagrahi = (paragraphus) => {
        console.log(paragraphus, commentedParagraphi, 'UPDATE')
        if (commentedParagraphi.filter(paragraphus=>paragraphus.id === paragraphus_id).length === 0) {
            const newParagraphi = [...commentedParagraphi]
            newParagraphi.push(paragraphus)
            TokenService.updateCommentedParagraphi(newParagraphi)
            dispatch(authActions.setCommentedParagraphi(newParagraphi))
        }
        refreshToken(refresh_token)
    }







    function adjustHeight(event) {
        const el = event.target
        el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight) + "px" : "60px";
    }

    return (

            <form method="post" className={classes.new_reply__form}
                  onSubmit={(event) => postCommentHandler(event, newComment.current.value, token)}>


                <textarea onKeyUp={adjustHeight} id="newComment" className={classes.new_reply__text}
                          defaultValue={newComment.current.value}
                          ref={newComment} placeholder="Treść odpowiedzi"/>
                <div className={classes.new_reply__action}>
                    {username && <button className="material-symbols-outlined" type="submit" disabled={!username}>
                                    send
                                </button>
                        }
                </div>

            </form>

    )
}

export default NewReply