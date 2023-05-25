import classes from "../commentsViewer/CommentsViewer.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useMutation, useQuery} from "@tanstack/react-query";
import NotificationService from "../../services/notification.service";
import NewReply from "../newReply/NewReply";
import ReplyViewer from "../replyViewer/ReplyViewer";
import {getReplies} from "../../api/api";
import {deleteComment} from "../../api/api";
import Spinner from "../UI/spinner/Spinner";

const RepliesViewer = ({repliedId, reply, onCloseReply, queryClient}) => {
    const username = useSelector(state => state.auth.username)



    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)


    const {data: replies, isFetching} = useQuery({
        queryKey: ["comment", "comments", username, repliedId],
        queryFn: () => getReplies(repliedId, username),
        onError: () => {
            notificationSetter.setNotificationError("Błąd", "Nie powiodło się ładowanie odpowiedzi")
        },
        initialData: []

    })

    if (replies) {

        replies.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date)
        })

    }

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteComment(id),
        onMutate: () => {
            notificationSetter.setNotificationPending("Rozpoczęto", "Komentarz jest w trakcie usuwania")
        },
        onSuccess: () => {
            notificationSetter.setNotificationSuccess("Sukces", "Komentarz usunięto")
            queryClient.invalidateQueries(["comment", "comments"])
        },
        onError: () => {
            notificationSetter.setNotificationError("Błąd", "Błąd autoryzacji lub sieci")
        }
    })
    const deleteCommentHandler = (id) => {
        deleteMutation.mutate(id)
    }

    if (isFetching) {return <Spinner/>}
    return (
        <>

            {reply && <NewReply paragraphus_id={0} reply_id={repliedId} username={username}
                                repliedId={repliedId} queryClient={queryClient}
                                onClose={onCloseReply}/>}
            <ul className={classes.replies__items}>


                {replies.map(r => <ReplyViewer key={r.id} reply={r} replyId={r.id} onDelete={deleteCommentHandler} queryClient={queryClient}/>)}


            </ul>
        </>
    )
}

export default RepliesViewer