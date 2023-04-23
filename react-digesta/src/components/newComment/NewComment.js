import {useSelector} from "react-redux";
import {useState} from "react";

const NewComment = (props) => {
    const token = useSelector(state => state.auth.tokens.access_token)
    const [isPrivate, setIsPrivate] = useState(false)
    const postCommentHandler = (event) => {
        event.preventDefault()

        const newComment = event.target[0].value
        const par_id = props.paragraphusId
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
                        reply_to_comment_id: null
                    })
                })

            const data = await response.json()
            return data
        }

        sendComment().then((response => {
            props.addNewComment(response)
        }))
    }

    return (
        <li>
            <form method="post" onSubmit={postCommentHandler}>
                <label htmlFor="newComment">Nowy komentarz</label>
                <input type="text" id="newComment"/>
                <button type="submin">wyślij</button>
            </form>
        </li>
    )
}

export default NewComment