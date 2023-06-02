import {useDispatch} from "react-redux";
import {useState} from "react";
import {authActions} from "../../store/auth-slice";
import TokenService from "../../services/token.service";
import NotificationService from "../../services/notification.service";
import {refreshToken} from "../../store/auth-actions";
import tokenService from "../../services/token.service";
import {useRef} from "react";
import classes from "./NewComment.module.css";
import {useMutation} from "@tanstack/react-query";
import {adjustHeight} from "../../services/helpers";
import {postComment} from "../../api/api";
import {uiActions} from "../../store/ui-slice";

const NewComment = ({
                        paragraphus_id,
                        onClose,
                        type,
                        username,
                        queryClient,
                    }) => {
    const [isPrivate, setIsPrivate] = useState(false);
    const newComment = useRef("");

    const dispatch = useDispatch();
    const notificationSetter = new NotificationService(dispatch);

    const updateCommentedParagrahi = (paragraphus) => {
        const refresh_token = tokenService.getLocalRefreshToken();
        const commentedParagraphi = tokenService.getCommentedParagraphi();
        if (
            commentedParagraphi.filter((par) => par.id === paragraphus.id).length ===
            0
        ) {
            commentedParagraphi.push(paragraphus);
            TokenService.updateCommentedParagraphi(commentedParagraphi);
            dispatch(authActions.setCommentedParagraphi(commentedParagraphi));
        }
        refreshToken(refresh_token);
    };

    const postCommentMutation = useMutation({
        mutationFn: ({newComment, isPrivate}) =>
            postComment({
                newComment,
                isPrivate,
                id: paragraphus_id,
                repliedId: null,
            }),
        onMutate: () => {
            notificationSetter.setNotificationPending(
                "Trwa wysyłanie komentarza",
                "Czekamy na odpowiedź"
            );
        },


        //   updateCommentedParagrahi(data);
        //   queryClient.invalidateQueries(
        //     ["comment", "paragraphus", username, paragraphus_id],
        //     { exact: false }
        //   );
        // },

        onSuccess: (data) => {
            notificationSetter.setNotificationSuccess(
                "Sukces",
                "Komentarz zamieszczony",
            )
            dispatch(authActions.setCommentedParagraphi(data))
            queryClient.invalidateQueries({ queryKey: ["comment", "paragraphus", paragraphus_id]})
            // tokenService.updateCommentedParagraphi(data)

        },
        onError: (e) => {
            if (e.response.status === 401) {
                dispatch(authActions.resetToken());
                TokenService.removeUser();
                notificationSetter.setNotificationError(
                    "Błąd autoryzacji",
                    "zaloguj się ponownie jeśli chcesz dodać komentarz"
                );
            }
            notificationSetter.setNotificationError(
                "Błąd",
                "Nie udało się zamieścić komentarza"
            );
        },
    });

    const postCommentHandler = (e, newComment) => {
        e.preventDefault();
        postCommentMutation.mutate({
            newComment: newComment,
            isPrivate: isPrivate,
        });
    };

    const openLoginModalHandler = (e) => {
        e.preventDefault();
        dispatch(uiActions.logingToggle());
    };

    return (
        <div className={classes.new_comment}>
            <form
                method="post"
                className={classes.new_comment__container}
                onSubmit={(event) =>
                    postCommentHandler(event, newComment.current.value)
                }
            >
        <textarea
            onKeyUp={adjustHeight}
            id="newComment"
            className={classes.new_comment__text}
            defaultValue={newComment.current.value}
            placeholder="Treść notatki"
            disabled={!username}
            ref={newComment}
        />
                <div className={classes.new_comment__icons}>
                    <div className={classes.new_comment__action}>
                        {!username && (
                            <>
                                <button
                                    type="button"
                                    className="material-symbols-outlined"
                                    onClick={openLoginModalHandler}
                                >
                                    login
                                </button>
                                <label>Zaloguj się</label>
                            </>
                        )}

                        {username && (
                            <>
                                <button
                                    className="material-symbols-outlined"
                                    type="submit"
                                    disabled={!username}
                                >
                                    send
                                </button>
                                <label>Opublikuj</label>
                            </>
                        )}
                    </div>
                    <div className={classes.new_comment__action}>
                        <button
                            type="button"
                            className="material-symbols-outlined"
                            disabled={!username}
                            onClick={() => setIsPrivate(!isPrivate)}
                        >
                            {isPrivate ? "visibility_off" : "visibility"}
                        </button>
                        <label>
                            {isPrivate ? "Notatka prywatna" : "Notatka publiczna"}
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewComment;
