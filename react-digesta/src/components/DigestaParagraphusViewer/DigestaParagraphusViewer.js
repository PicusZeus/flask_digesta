import {json, useLoaderData} from "react-router-dom";
import CommentViewer from "../commentViewer/CommentViewer";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NewComment from "../newComment/NewComment";
import tokenService from "../../services/token.service";
import {authActions} from "../../store/auth-slice";
import {refreshToken} from "../../store/auth-actions";
import TokenService from "../../services/token.service";

const DigestaParagraphusViewer = (props) => {
    const [comments, setComments] = useState([])

    const username = useSelector(state => state.auth.username)
    let user = tokenService.getUser()
    const dispatch = useDispatch()
    const rerender = useSelector(state => state.ui.rerender)
    // const token =
    const token = useMemo(() => {
        tokenService.getLocalAccessToken()
    }, [])
    const refresh_token = user?.refresh_token
    let paragraphus = useLoaderData()
    if (props.paragraphus) {
        paragraphus = props.paragraphus
    }
    const addNewCommentHandler = (newComment) => {
        const newComments = [...comments]
        newComments.push(newComment)


        setComments(newComments)
    }
    // const [headers, setHeaders] = useState({"Content-Type": "application/json"})
    const headers = useMemo(() => (
        {"Content-Type": "application/json"}

    ), [username])

    // console.log(headers, paragraphus.id, 'here')
    useEffect(() => {
        if (token) {
            headers['Authorization'] = "Bearer " + token
        }
        const sendRequest = async () => {
            const response = await fetch("http://127.0.0.1:5001/comment/paragraphus/" + paragraphus.id, {
                headers: headers
            });

            if (response.status === 401) {
                dispatch(refreshToken(refresh_token))
                return null

            } else if (response.ok) {
                const data = await response
                return data.json()
            } else {
                throw new Error('error')
            }
        }
        sendRequest().then((response) => {
            if (response) {

                setComments(response)
                // dispatch(refreshToken(refresh_token))
                // if (response.access_token !== "False")
                // {TokenService.updateLocalAccessToken(response.access_token)}
            }


        }).catch((e) => {
            console.log(e.status, 'STATUS')


        })
    }, [token, dispatch, refresh_token, paragraphus, headers, username, rerender])

    // console.log('comments in viewer', comments)
    return (
        <>
            <div>Paragraf</div>
            <div>{paragraphus.text_lat}</div>
            <h4>comments</h4>
            <ul>
                {paragraphus && <NewComment paragraphus={paragraphus} addNewComment={addNewCommentHandler}/>}
                {comments && comments.map((comment) => (
                    <CommentViewer key={comment.id}
                                   c_id={comment.id}
                                   paragraphus={paragraphus}
                                   comment={comment}
                                   replies={comment.replies}/>))}

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
        return await response.json()
    }
}

