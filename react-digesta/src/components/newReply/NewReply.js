import {useDispatch} from "react-redux";
import {authActions} from "../../store/auth-slice";
import TokenService from "../../services/token.service";
import NotificationService from "../../services/notification.service";
import {useRef} from "react";
import classes from './NewReply.module.css'
import {useMutation} from "@tanstack/react-query";
import {postComment} from "../../api/api";
import {adjustHeight} from "../../services/helpers";
const NewReply = ({paragraphus_id, onUpdate, onClose, paragraphus, repliedId, type, username, queryClient}) => {
    const newComment = useRef('')
    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)



    const mutation = useMutation({
        mutationFn: ({newComment, isPrivate, id, repliedId}) => postComment({newComment, isPrivate, id, repliedId}),
        onMutate: ()=> {notificationSetter.setNotificationPending('Trwa wysyłanie komentarza', 'Czekamy na odpowiedź')},
        onSuccess: () => {
            notificationSetter.setNotificationSuccess("Sukces", "Komentarz zamieszczony")

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
            isPrivate: false,
            id: 0,
            repliedId: repliedId,
        })
        onClose()

    }



    return (

            <form method="post" className={classes.new_reply__form}
                  onSubmit={(event) => postCommentHandler(event, newComment.current.value)}>


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