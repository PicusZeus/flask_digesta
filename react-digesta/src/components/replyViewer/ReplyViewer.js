import { useState } from "react";
import RepliesViewer from "../repliesViewer/RepliesViewer";
import classes from "./ReplyViewer.module.css";
import { createPrettyDate } from "../../services/helpers";
import { useMutation } from "@tanstack/react-query";
import { likeComment } from "../../api/api";
import { useDispatch } from "react-redux";
import NotificationService from "../../services/notification.service";
import tokenService from "../../services/token.service";
import Confirmation from "../UI/confirmation/Confirmation";

const ReplyViewer = ({ reply, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(reply.likes.length);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isReplying, setIsReplaying] = useState(false);

  const dispatch = useDispatch();

  const notificationSetter = new NotificationService(dispatch);
  const user_id = tokenService.getUserId();

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
    likeCommentMutation.mutate(reply.id);
  };
  const onDeleteConfirmation = (id) => {
    onDelete(id);
    setDeleteDialog(false);
  };

  const commentCreatedTime = createPrettyDate(reply.date);
  return (
    <>
      {deleteDialog && (
        <Confirmation
          cancelAction={() => setDeleteDialog(false)}
          title=""
          message=""
          confirmAction={() => onDeleteConfirmation(reply.id)}
        />
      )}
      <li className={classes.reply__item}>
        <div className={classes.reply__item_main}>
          <header>
            <p>{reply.user.username}</p>
            <div>{commentCreatedTime}</div>
          </header>

          <div className={classes.reply__item_text}>{reply.comment}</div>
        </div>
        <div className={classes.reply__item_actions}>
          <div className={classes.reply__item_action}>
            <button
              onClick={onLikedHandler}
              disabled={!user_id}
              className="material-symbols-outlined"
            >
              {!liked ? "favorite" : "heart_check"}
              <span className={classes.likes_num}>{likes}</span>
            </button>
            <span className={classes.tooltiptext}>polub</span>
          </div>

          <div className={classes.reply__item_action}>
            <button
              onClick={() => setIsReplaying(!isReplying)}
              disabled={!user_id}
              className="material-symbols-outlined"
            >
              {" "}
              reply
            </button>
            <span className={classes.tooltiptext}>odpowiedz</span>
          </div>

          <div className={classes.reply__item_action}>
            <button
              className="material-symbols-outlined"
              onClick={() => setDeleteDialog(true)}
              disabled={user_id !== reply.user.id.toString()}
            >
              delete_forever
            </button>
            <span className={classes.tooltiptext}>usuń</span>
          </div>
        </div>
        <RepliesViewer
          repliedId={reply.id}
          onCloseReply={() => setIsReplaying(false)}
          reply={isReplying}
        />
      </li>
    </>
  );
};

export default ReplyViewer;
