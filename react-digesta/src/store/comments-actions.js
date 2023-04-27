import {commActions} from "./comments-slice";
import {uiActions} from "./ui-slice";

import NotificationService from "../services/notification.service";
import tokenService from "../services/token.service";
import TokenService from "../services/token.service";
import {authActions} from "./auth-slice";


export const addComment = (token, par_id, commentText, paragraphus, isPrivate, reply_to_comment_id) => {
    return async (dispatch) => {
        const notificationSetter = new NotificationService(dispatch)
        notificationSetter.setNotificationPending("Komentarz", "Wysyłam komentarz")
        const sendComment = async () => {
            const response = await fetch("http://127.0.0.1:5001/comment/paragraphus/" + par_id,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    },
                    body: JSON.stringify({
                        comment: commentText,
                        private: isPrivate,
                        reply_to_comment_id: reply_to_comment_id
                    })
                })


            const data = await response.json()
            return [data, response.status]
        }

        try {
            const [response, status] = await sendComment()
            if (status === 401) {
                return false

            } else {
                notificationSetter.setNotificationSuccess("komentarz", "komentarz zamieszczony")
                const commentedParagraphi = tokenService.getCommentedParagraphi()
                if (commentedParagraphi.filter((paragraphus) =>
                        paragraphus.id === par_id).length === 0
                ) {
                    commentedParagraphi.push(paragraphus)
                    TokenService.updateCommentedParagraphi(commentedParagraphi)
                    dispatch(authActions.setCommentedParagraphi(commentedParagraphi))
                    return 1
                }
                else {
                    return 2
                }

            }
        } catch (e) {
            notificationSetter.setNotificationError("komentarz", "błąd serwera")

        }
    }
}

//
// export const loadComments = (token, paragraphId) => {
//
//
//     return async (dispatch) => {
//         const sendRequest = async () => {
//             const response = await fetch("http://127.0.0.1:5001/comment/paragraphus/" + paragraphId, {
//                 headers: headers
//             })
//
//             const data = await response.json()
//             return data
//
//         }
//         try {
//             const data = await sendRequest()
//             dispatch(commActions.setComments(data))
//         } catch (e) {
//             dispatch(uiActions.setNotification({
//                 status: "error",
//                 title: "wystąpił błąd",
//                 message: "nie udało się załadować komentarzy"
//             }))
//             setTimeout(() => dispatch(uiActions.resetNotification()), 2000)
//
//         }
//     }
//
//
// }