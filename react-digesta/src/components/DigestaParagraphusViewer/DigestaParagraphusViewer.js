import {json, useLoaderData} from "react-router-dom";
import CommentViewer from "../commentViewer/CommentViewer";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NewComment from "../newComment/NewComment";
import tokenService from "../../services/token.service";
import {refreshToken} from "../../store/auth-actions";
import NotificationService from "../../services/notification.service";

const DigestaParagraphusViewer = (props) => {
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const username = useSelector(state => state.auth.username)

    const dispatch = useDispatch()
    const rerender = useSelector(state => state.ui.rerender)
    // const token =
    // const token = useMemo(() => {
    //     tokenService.getLocalAccessToken()
    // }, [])
    const token = tokenService.getLocalAccessToken()
    const refresh_token = tokenService.getLocalRefreshToken()
    let paragraphus = useLoaderData()
    if (props.paragraphus) {
        paragraphus = props.paragraphus
    }
    let paragraphusKey = null
    if (paragraphus.key !== 'pr') {paragraphusKey = paragraphus.key}
    const addNewCommentHandler = (newComment) => {
        const newComments = [...comments]
        newComments.push(newComment)


        setComments(newComments)
    }

    let newComment = <h2>Jeśli chcesz napisać komentarz, zaloguj się</h2>

    if (username && paragraphus) {
        newComment = <NewComment paragraphus={paragraphus} addNewComment={addNewCommentHandler}/>
    }

    const headers = useMemo(() => (
        {"Content-Type": "application/json"}

    ), [username])

    useEffect(() => {
        if (token) {
            headers['Authorization'] = "Bearer " + token
        }
        const notificationSetter = new NotificationService(dispatch)
        const sendRequest = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "comment/paragraphus/" + paragraphus.id, {
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
            }
        }).catch((e) => {
            notificationSetter.setNotificationError('Komentarze', 'Nie udało się załadować komentarzy')


        })
    }, [token, dispatch, refresh_token, paragraphus, headers, username, rerender])

    // console.log('comments in viewer', comments)
    return (
        <>
            {paragraphusKey && <h2>Paragraf {paragraphusKey}</h2>}
            <div>{paragraphus.text_lat}</div>
            <button onClick={()=>setShowComments(!showComments)}>{showComments ? "schowaj" : "pokaż"} komentarze</button>
            {showComments && <ul>
                {newComment}
                {comments && comments.map((comment) => (
                    <CommentViewer key={comment.id}
                                   c_id={comment.id}
                                   paragraphus={paragraphus}
                                   comment={comment}
                                   replies={comment.replies}/>))}

            </ul>}

        </>

    )
}
export default DigestaParagraphusViewer

export const loader = async ({params, request}) => {
    const id = params.paragraphus_id
    const response = await fetch(process.env.REACT_APP_BASE_API_URL + "digesta/paragraphi/" + id)

    if (!response.ok) {
        throw json(
            {message: 'I messed up even more'},
            {status: 500}
        )
    } else {
        return await response.json()
    }
}

