import {useLoaderData} from "react-router-dom";
import {json} from "react-router-dom";
import CommentViewer from "../commentViewer/CommentViewer";
import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import NewComment from "../newComment/NewComment";


const DigestaParagraphusViewer = (props) => {
    const [comments, setComments] = useState([])
    const token = useSelector(state => state.auth.tokens.access_token)
    let paragraphus = useLoaderData()
    if (props.paragraphus) {
        paragraphus = props.paragraphus
    }
    console.log('idDDDDDDDDDDD', paragraphus)

    const addNewCommentHandler = (newComment) => {
        const newComments = [...comments]
        newComments.push(newComment)


        setComments(newComments)
    }

    const headers = useMemo(()=>(
        {"Content-Type": "application/json"}

    ),[])
    if (token) {
        headers['Authorization'] = "Bearer " + token
    }

    useEffect(() => {
        console.log('load comments')
        const sendRequest = async () => {
            const response = await fetch("http://127.0.0.1:5001/comment/paragraphus/" + paragraphus.id, {
                headers: headers
            })
            const data = await response.json()
            return data
        }
        sendRequest().then((response) => {
            setComments(response)

        }).catch((e) => {
            console.log(e)
        })
    }, [paragraphus, headers])

    console.log('comments in viewer', comments)
    return (
        <>
            <div>Paragraf</div>
            <div>{paragraphus.text_lat}</div>
            <h4>comments</h4>
            <ul>
                {paragraphus && <NewComment paragraphus={paragraphus} addNewComment={addNewCommentHandler}/>}
                {comments && comments.map((comment) => (<CommentViewer paragraphus={paragraphus} comment={comment} replies={comment.replies}/>))}

            </ul>

        </>

    )
}
export default DigestaParagraphusViewer

export const loader = async ({params, request}) => {
    const id = params.paragraphus_id
    const response = await fetch("http://127.0.0.1:5001/digesta/paragraphi/" + id)

    if (!response.ok) {
        throw json(
            {message: 'I messed up even more'},
            {status: 500}
        )
    } else {
        const data = await response.json()
        return data
    }
}

