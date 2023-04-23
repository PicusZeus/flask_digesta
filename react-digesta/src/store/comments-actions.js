import {commActions} from "./comments-slice";
import {uiActions} from "./ui-slice";

export const addComment = (paragraphId, commentText, isPrivate, token, reply_to_comment_id) => {
    return async (dispatch) => {

        dispatch(uiActions.setNotification({
            status: "pending",
            title: 'wysyłam',
            message: 'twój komentarz jest wysyłany'
        }))
        setTimeout(() => dispatch(uiActions.resetNotification()), 2000)
        const sendComment = async () => {
            const response = await fetch("https://127.0.0.1:5001/comment/paragraphus/" + paragraphId,
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
            return data
        }

        try {
            const response = await sendComment()
            if (response.code === 401) {
                dispatch(uiActions.setNotification({
                    status: "error",
                    title: "nie masz uprawnienie",
                    message: "post nie został wysłany"
                }))
                setTimeout(() => dispatch(uiActions.resetNotification()), 2000)
            } else {
                dispatch(uiActions.setNotification({
                    status: "success",
                    title: "Post wysłany",
                    message: 'Wysłanie postu zakończone sukcesem'
                }))
                setTimeout(() => dispatch(uiActions.resetNotification()), 2000)

            }
        } catch (e) {
            dispatch(uiActions.setNotification({
                status: "error",
                title: "błąd wysyłania",
                message: "post nie został wysłany"
            }))
            setTimeout(() => dispatch(uiActions.resetNotification()), 2000)

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