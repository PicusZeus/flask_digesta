import {json, useLoaderData} from "react-router-dom";
import CommentViewer from "../commentViewer/CommentViewer";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NewComment from "../newComment/NewComment";
import tokenService from "../../services/token.service";
import {refreshToken} from "../../store/auth-actions";
import NotificationService from "../../services/notification.service";
import classes from "./DigestaParagraphusViewer.module.css"

const DigestaParagraphusViewer = (props) => {
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const username = useSelector(state => state.auth.username)
    const [commentsClasses, setCommentsClasses] = useState(classes.hide_comments)

    const dispatch = useDispatch()
    const rerender = useSelector(state => state.ui.rerender)

    const showCommentsLoader = () => {

        if (!showComments) {
            setCommentsClasses(classes.paragraph_comments__items)
        } else {
            setCommentsClasses(classes.hide_comments)
        }
        setShowComments((current) => !current)
    }

    const token = tokenService.getLocalAccessToken()
    const refresh_token = tokenService.getLocalRefreshToken()
    let paragraphus = useLoaderData()
    if (props.paragraphus) {
        paragraphus = props.paragraphus
    }
    let paragraphusKey = null
    if (paragraphus.key !== 'pr') {
        paragraphusKey = paragraphus.key
    }
    const addNewCommentHandler = (newComment) => {
        const newComments = [...comments]
        newComments.push(newComment)


        setComments(newComments)
    }

    let newComment = <li className={classes.paragraph_logout}><h2>Jeśli chcesz dodać komentarz, zaloguj się</h2></li>

    if (username && paragraphus) {
        newComment = <NewComment type="Skomentuj!" paragraphus={paragraphus} addNewComment={addNewCommentHandler}/>
    }


    useEffect(() => {
        const headers = {
            "Content-Type": "application/json"
        }
        if (token !== "EXPIRED" && token) {
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
    }, [token, dispatch, refresh_token, paragraphus, username, rerender])

    // const latinText = paragraphus.text_lat
    // const reIt = new RegExp("<it>")
    // const reItEnd = new RegExp("<\\/it>")
    // let l = latinText.split(reIt)
    // const tags = {'<it>': "</it>"}
    // const jsxT = [l[0]]
    // for (let i = 1; i < l.length; i++) {
    //     console.log(i, l[i])
    //     const rest = l[i].split(reItEnd)
    //     console.log(rest[0], 'REST')
    //     jsxT.push(<i>{rest[0]}</i>)
    //     jsxT.push(rest[1])


    // }
    const addItalicTags = (text) => {
       const reStart = new RegExp("<it>")
       const reItEnd = new RegExp("<\\/it>")

        const splitOnIt = text.split(reStart)
        const jsx = [splitOnIt[0]]
        for (let i = 1; i < splitOnIt.length; i++) {
            const rest = splitOnIt[i].split(reItEnd)
            jsx.push(<i>{rest[0]}</i>)
            jsx.push(rest[1])
        }
        return jsx
    }
    const addRowTags = (text) => {
        const rowStart = new RegExp("<tr>")
        const rowEnd = new RegExp("<\\/tr>")

        const splitOnRow = text.split(rowStart)
        const jsx = [splitOnRow[0]]
        for (let i = 1; i < splitOnRow.length; i++) {
            const rest = splitOnRow[i].split(rowEnd)
            console.log(rest[0])
            const row = rest[0].split('|').filter(i => i)
            console.log(rest[0].split('  '))
            const cells = []
            for (let cell of row) {
                cells.push(<td>{cell}</td>)
            }
            jsx.push(<tr>{cells}</tr>)
            jsx.push(rest[1])



        }
        return jsx
    }
    const addTableTags = (text) => {
        const tableStart = new RegExp("<table>")
        const tableEnd = new RegExp("<\\/table>")

        const splitOnTable = text.split(tableStart)
        const jsx = [...addItalicTags(splitOnTable[0])]
        for (let i = 1; i < splitOnTable.length; i++) {
            const rest = splitOnTable[i].split(tableEnd)


            jsx.push(<table>{addRowTags(rest[0])}</table>)
            jsx.push(rest[1])
        }
        return jsx
    }


    const latinText = addTableTags(paragraphus.text_lat)
    const polText = addTableTags(paragraphus.text_pl)


    return (
        <>
            {paragraphusKey && <h2>Paragraf {paragraphusKey}</h2>}
            <section className={classes.paragraph_text__container}>
                <div>{latinText}</div>
                {/*<div>{paragraphus.text_lat}</div>*/}
                <div>{polText}</div>
            </section>
            <section className={classes.paragraph_comments__container}>
                <button onClick={showCommentsLoader}>
                    {showComments ? "schowaj" : "pokaż"} komentarze
                </button>
                <ul className={commentsClasses}>
                    {newComment}
                    {comments && comments.map((comment) => (
                        <CommentViewer key={comment.id}
                                       c_id={comment.id}
                                       paragraphus={paragraphus}
                                       comment={comment}
                                       type="Odpowiedz!"
                                       replies={comment.replies}/>))}

                </ul>
            </section>
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

