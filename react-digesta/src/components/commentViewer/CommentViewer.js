const CommentViewer = (props) => {
    const replies = props.replies

    return (<>

        <li>
            <textarea defaultValue={props.comment.comment}/>
            <ul>

                {replies.map((reply) => (<CommentViewer comment={reply} replies={reply.replies}/>))}

            </ul>

        </li>
    </>)
}

export default CommentViewer