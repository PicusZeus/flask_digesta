import {useEffect, useState} from "react";
import NewComment from "../newComment/NewComment";

const CommentViewer = (props) => {
    // const replies = props.replies
    const [replies, setReplies] = useState([])
    const comment = props.comment
    const comment_id = comment.id
    const [isReplying, setIsReplaying] = useState(false)
    const props_replies = props.replies
    useEffect(()=>{if (props_replies) {
        setReplies(props_replies)
    }},[props_replies])



    const addReplyHandler = (reply) => {
        const newReplies = [...replies]

        newReplies.push(reply)
        setReplies(newReplies)
    }
    console.log(props.paragraphus, 'IN VIEWER')
    return (

        <li>
<ul>
            <textarea defaultValue={comment.comment}/>
            <button onClick={() => setIsReplaying(!isReplying)}>odpowiedz</button>
            {isReplying && <NewComment paragraphus={props.paragraphus}
                                       repliedId={comment_id}
                                       addNewComment={addReplyHandler}/>}


                {replies.map((reply) => (<CommentViewer paragraphus={props.paragraphus}
                                                        comment={reply}
                                                        replies={reply.replies}/>))}

            </ul>

        </li>
    )
}

export default CommentViewer