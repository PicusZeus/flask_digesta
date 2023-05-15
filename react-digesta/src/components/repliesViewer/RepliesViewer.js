import classes from "../commentsViewer/CommentsViewer.module.css";
import CommentViewer from "../commentViewer/CommentViewer";
import {useDispatch, useSelector} from "react-redux";
import NewComment from "../newComment/NewComment";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import NotificationService from "../../services/notification.service";
import tokenService from "../../services/token.service";
import api, {deleteComment} from "../../api/api";
import {useState} from "react";
import NewReply from "../newReply/NewReply";
import ReplyViewer from "../replyViewer/ReplyViewer";


const RepliesViewer = ({repliedId, reply, onCloseReply, queryClient}) => {
    // const [replyOpen, setReplyOpen] = useState(reply)
    // const [replies, setReplies] = useState([])
    const [replyInput, setReplyInput] = useState(false)
    const [update, setUpdate] = useState(false)
    const username = useSelector(state => state.auth.username)
    let newReply = <li className={classes.paragraph_logout}><h2>Jeśli chcesz dodać komentarz, zaloguj się</h2></li>
    // const queryClient = useQueryClient()
    // const queryClient = useQueryClient()
    if (username) {
        newReply = <NewReply type="Skomentuj!" paragraphus_id={0} reply_id={repliedId} username={username}
                             repliedId={repliedId} onUpdate={setUpdate} queryClient={queryClient}/>
    }

    const dispatch = useDispatch()
    const notificationSetter = new NotificationService(dispatch)

    const getReplies = (id, username) => {

        if (username) {
            const token = tokenService.getLocalAccessToken()
            return api.get("comment/comments/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => response.data)
        } else {
            return api.get("comment/comments/" + id)
                .then(response => {
                    return response.data
                })
        }
    }

    const {data: replies} = useQuery({
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
    return (
        <>

            {reply && <NewReply paragraphus_id={0} type="Skomentuj!" reply_id={repliedId} username={username}
                                repliedId={repliedId} onUpdate={setUpdate} queryClient={queryClient}
                                onClose={onCloseReply}/>}
            <ul className={classes.replies__items}>


                {replies.map(r => <ReplyViewer key={r.id} reply={r} replyId={r.id} onDelete={deleteCommentHandler} queryClient={queryClient}/>)}


            </ul>
        </>
    )
}

export default RepliesViewer