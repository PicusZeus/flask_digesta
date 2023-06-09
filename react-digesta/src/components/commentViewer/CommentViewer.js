import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import tokenService from "../../services/token.service";
import NotificationService from "../../services/notification.service";

import Confirmation from "../UI/confirmation/Confirmation";
import classes from "./CommentViewer.module.css";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import RepliesViewer from "../repliesViewer/RepliesViewer";
import { saveEditedComment, likeComment } from "../../api/api";
import { createPrettyDate, adjustHeight } from "../../services/helpers";

const CommentViewer = ({
  comment,
  onDelete,
}) => {
  const queryClient = useQueryClient()
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes.length);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editOn, setEditOn] = useState(false);
  const [isReplying, setIsReplaying] = useState(false);

  const dispatch = useDispatch();
  const notificationSetter = new NotificationService(dispatch);

  const commentText = useRef(comment);

  const user_id = tokenService.getUserId();
  useEffect(() => {
    if (
      comment.likes.filter((like) => like.user_id === parseInt(user_id))
        .length > 0
    ) {
      setLiked(true);
    }
  }, [comment.likes, user_id]);

  const saveEditedMutation = useMutation({
    mutationFn: ({ newText, id }) => saveEditedComment({ newText, id }),
    onMutate: () => {
      notificationSetter.setNotificationPending(
        "Rozpoczęto",
        "Aktualizacja w toku"
      );
    },
    onSuccess: () => {
      notificationSetter.setNotificationSuccess(
        "Sukces",
        "Wpis został zaktualizowany"
      );
    },
    onError: () => {
      notificationSetter.setNotificationError(
        "Niepowodzenie",
        "Problem z siecią lub autoryzacją"
      );
    },
  });

  const likeCommentMutation = useMutation({
    mutationFn: (comment_id) => {
      likeComment(comment_id);
    },
    onSuccess: () => {
      setLiked((current) => !current);
      if (liked) {
        setLikes((current) => {
          return current - 1;
        });
      } else {
        setLikes((current) => {
          return current + 1;
        });
      }
    },
    onError: () => {
      notificationSetter.setNotificationError(
        "Błąd Sieci",
        "Nie udało się połączyć z serwerem"
      );
    },
  });

  const onLikedHandler = () => {
    likeCommentMutation.mutate(comment.id);
  };

  const commentCreatedTime = createPrettyDate(comment.date);

  const onDeleteHandler = () => {
    setDeleteDialog(false)
    onDelete(comment.id)
  }

  return (
    <>
      {deleteDialog && (
        <Confirmation
          cancelAction={() => setDeleteDialog(false)}
          title=""
          message=""
          confirmAction={onDeleteHandler}
        />
      )}
      <li className={classes.comment_item}>
        <div className={classes.comment_container}>
          <div className={classes.comment_item__left}>
            <span className="material-symbols-outlined">person</span>
            <div>&nbsp;</div>
          </div>

          <div className={classes.comment_item__container}>
            <div className={classes.comment_item__container}>
              <div className={classes.comment_item__user_info}>
                <p>{comment.user.username}</p>
                <div>{commentCreatedTime}</div>
              </div>

              <textarea
                ref={commentText}
                onKeyUp={adjustHeight}
                className={classes.comment_item__text}
                id="comment"
                disabled={!editOn}
                defaultValue={comment.comment}
              ></textarea>
              <div className={classes.comment_item__actions}>
                {comment.private && (
                  <button className="material-symbols-outlined">
                    visibility_lock
                  </button>
                )}

                <button
                  onClick={onLikedHandler}
                  disabled={!user_id}
                  className="material-symbols-outlined"
                >
                  {!liked ? "favorite" : "heart_check"}
                  <span className={classes.likes_num}>{likes}</span>
                  <span className={classes.tooltiptext}>polub</span>
                </button>
                <button
                  onClick={() => setIsReplaying(!isReplying)}
                  disabled={!user_id}
                  className="material-symbols-outlined"
                >
                  {/*{" "}*/}
                  reply
                  <span className={classes.tooltiptext}>odpowiedz</span>
                </button>
                <button
                  className="material-symbols-outlined"
                  onClick={() =>
                    saveEditedMutation.mutate({
                      newText: commentText.current.value,
                      id: comment.id,
                    })
                  }
                  disabled={!editOn}
                >
                  save
                  <span className={classes.tooltiptext}>zapisz zmiany</span>
                </button>
                <button
                  onClick={() => setEditOn(!editOn)}
                  className="material-symbols-outlined"
                  disabled={user_id !== comment.user.id.toString()}
                >
                  edit
                  <span className={classes.tooltiptext}>edytuj</span>
                </button>
                <button
                  className="material-symbols-outlined"
                  onClick={() => setDeleteDialog(true)}
                  disabled={user_id !== comment.user.id.toString()}
                >
                  delete_forever
                  <span className={classes.tooltiptext}>usuń</span>
                </button>
              </div>
            </div>
            <RepliesViewer
              repliedId={comment.id}
              onCloseReply={() => setIsReplaying(false)}
              reply={isReplying}
            />
          </div>
        </div>
      </li>
    </>
  );
};

export default CommentViewer;
