

const NewComment = (props) => {

    const postCommentHandler = (event) => {
        event.preventDefault()
        const newComment = event.target[0].value
        const par_id = props.paragraphusId
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