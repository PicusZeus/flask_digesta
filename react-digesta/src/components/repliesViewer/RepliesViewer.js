import classes from "../commentsViewer/CommentsViewer.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import NotificationService from "../../services/notification.service";
import NewReply from "../newReply/NewReply";
import ReplyViewer from "../replyViewer/ReplyViewer";
import {getReplies} from "../../api/api";
import {deleteComment} from "../../api/api";
import Spinner from "../UI/spinner/Spinner";
import {useState} from "react";

const RepliesViewer = ({
                           repliedId,
                           reply,
                           onCloseReply,
                       }) => {
    const queryClient = useQueryClient()
    const username = useSelector((state) => state.auth.username);
    const [replies, setReplies] = useState([])
    const dispatch = useDispatch();
    const notificationSetter = new NotificationService(dispatch);

    const {isFetching} = useQuery({
        queryKey: ["comment", "comments", username, repliedId],
        queryFn: () => getReplies(repliedId, username),
        onSuccess: (data)=> {setReplies(data)},
        onError: () => {
            notificationSetter.setNotificationError(
                "Błąd",
                "Nie powiodło się ładowanie odpowiedzi"
            );
        },

    });

    if (replies) {
        replies.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteComment(id),
        onMutate: () => {
            notificationSetter.setNotificationPending(
                "Rozpoczęto",
                "Komentarz jest w trakcie usuwania"
            );
        },
        onSuccess: (data, id, context) => {
            notificationSetter.setNotificationSuccess("Sukces", "Komentarz usunięto");
            setReplies((current)=>{
                const currentReplies = current.filter(r=>(r.id !== id));
                return currentReplies
            })
            // await queryClient.invalidateQueries(["comment", "comments"]);

        },
        onError: () => {
            notificationSetter.setNotificationError(
                "Błąd",
                "Błąd autoryzacji lub sieci"
            );
        },
    });
    const deleteCommentHandler = (id) => {
        deleteMutation.mutate(id);
    };

    if (isFetching) {
        return <Spinner/>;
    }
    return (
        <>
            {reply && (
                <NewReply
                    paragraphus_id={0}
                    reply_id={repliedId}
                    username={username}
                    repliedId={repliedId}
                    queryClient={queryClient}
                    onClose={onCloseReply}
                />
            )}
            <ul className={classes.replies__items}>
                {replies.map((r) => (
                    <ReplyViewer
                        key={r.id}
                        reply={r}
                        replyId={r.id}
                        onDelete={deleteCommentHandler}
                        queryClient={queryClient}
                    />
                ))}
            </ul>
        </>
    );
};

export default RepliesViewer;
