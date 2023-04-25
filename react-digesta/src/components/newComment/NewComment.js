import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {authActions} from "../../store/auth-slice";
import TokenService from "../../services/token.service";
const NewComment = (props) => {
    const user = TokenService.getUser()
    const token = user?.access_token
    const dispatch = useDispatch()
    const [isPrivate, setIsPrivate] = useState(false)
    let repliedId = null
    if (props.repliedId) {
        repliedId = props.repliedId
    }
    const authenticated = user
    const commentedParagraphi = user?.paragraphi
    const par_id = props.paragraphus.id
    const postCommentHandler = (event) => {
        event.preventDefault()

        const newComment = event.target[0].value

        const sendComment = async () => {

            const response = await fetch("http://127.0.0.1:5001/comment/paragraphus/" + par_id,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    },
                    body: JSON.stringify({
                        comment: newComment,
                        private: isPrivate,
                        "reply_to_comment_id": repliedId
                    })
                })

            const data = await response
            if (data.status === 401) {
                throw new Error('anauthorised')
            }
            return data.json()
        }

        sendComment().then((response => {
            props.addNewComment(response)
            if (commentedParagraphi.filter((paragraphus) => {
                return (paragraphus.id === par_id)
            }).length === 0 ) {
                const newParagraphi = [...commentedParagraphi]
                newParagraphi.push(props.paragraphus)
                TokenService.updateCommentedParagraphi(newParagraphi)
                dispatch(authActions.setCommentedParagraphi(newParagraphi))
            }

        })).catch((e)=> {
            console.log(e, 'error')
        })
    }

    return (
        <li>
            <form method="post" onSubmit={postCommentHandler}>
                <label htmlFor="newComment">Nowy komentarz</label>
                <input type="text" id="newComment"/>
                <button type="submit" disabled={!authenticated}>wyślij</button>
                <button type="button" onClick={() => setIsPrivate(!isPrivate)}>{isPrivate ? "komentarz prywatny" : "komentarz publiczny"}</button>
            </form>
        </li>
    )
}

export default NewComment