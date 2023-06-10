import classes from "./CommentsViewer.module.css";
import CommentViewer from "../commentViewer/CommentViewer";
import tokenService from "../../services/token.service";
import { useDispatch, useSelector } from "react-redux";
import NewComment from "../newComment/NewComment";
import NotificationService from "../../services/notification.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { authActions } from "../../store/auth-slice";
import { deleteComment, getComments } from "../../api/api";
import { useState } from "react";
import Spinner from "../UI/spinner/Spinner";

const CommentsViewer = ({ paragraphus_id, repliedId }) => {
  const [openNotes, setOpenNotes] = useState(false);

  const queryClient = useQueryClient();
  const username = useSelector((state) => state.auth.username);

  const dispatch = useDispatch();
  const notificationSetter = new NotificationService(dispatch);

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteComment(id),
    onMutate: () => {
      notificationSetter.setNotificationPending(
        "Rozpoczęto",
        "Komentarz jest w trakcie usuwania"
      );
    },
    onSuccess: (data) => {
      notificationSetter.setNotificationSuccess("Sukces", "Komentarz usunięto");
      queryClient.invalidateQueries({
        queryKey: ["comment", "paragraphus", paragraphus_id],
      });
      // queryClient.invalidateQuery(queryKey: [

      // ]);
      dispatch(authActions.setCommentedParagraphi(data));
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

  const { data: comments, isFetching } = useQuery({
    queryKey: ["comment", "paragraphus", paragraphus_id, username],
    queryFn: () => getComments(paragraphus_id, username),
    onError: (e) => {
      if (e.response.status === 401) {
        tokenService.removeUser();
        dispatch(authActions.resetToken());
      } else {
        notificationSetter.setNotificationError(
          "Błąd serwera",
          "Nie udało się załadować komentarzy"
        );
      }
    },
  });
  if (isFetching) {
    return <Spinner />;
  }

  if (comments) {
    comments.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  return (
    <>
      <button
        className={classes.comments__open}
        onClick={() => setOpenNotes((current) => !current)}
      >
        Notatki ({comments && comments.length})
      </button>

      {openNotes && (
        <>
          <NewComment
            paragraphus_id={paragraphus_id}
            username={username}
            repliedId={repliedId}
            queryClient={queryClient}
          />
          <ul className={classes.comments__items}>
            {comments &&
              comments.map((comment) => (
                <CommentViewer
                  key={comment.id}
                  paragraphus_id={paragraphus_id}
                  comment={comment}
                  type="Odpowiedz!"
                  queryClient={queryClient}
                  username={username}
                  onDelete={deleteCommentHandler}
                />
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default CommentsViewer;
