import {json, useLoaderData} from "react-router-dom";
import CommentViewer from "../commentViewer/CommentViewer";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NewComment from "../newComment/NewComment";
import tokenService from "../../services/token.service";
// import {refreshToken} from "../../store/auth-actions";
import NotificationService from "../../services/notification.service";
import classes from "./DigestaParagraphusViewer.module.css"
import {addTags} from "../../services/text.service";

import CommentsViewer from "../commentsViewer/CommentsViewer";







const DigestaParagraphusViewer = ({paragraphus}) => {

    const [showComments, setShowComments] = useState(true)

    // const rerender = useSelector(state => state.ui.rerender)

    const showCommentsLoader = () => {

        setShowComments((current) => !current)
    }


    let paragraphusKey = null
    if (paragraphus.key !== 'pr') {
        paragraphusKey = paragraphus.key
    }


    const latinText = addTags(paragraphus.text_lat)
    const polText = addTags(paragraphus.text_pl)


    return (
        <>
            {paragraphusKey && <h2>Paragraf {paragraphusKey}</h2>}
            <section className={classes.paragraph_text__container}>
                <div>{latinText}</div>
                <div>{polText}</div>
            </section>
            <section className={classes.paragraph_comments__container}>

                <CommentsViewer paragraphus={paragraphus} paragraphus_id={paragraphus.id} repliedId={null}/>
            </section>
        </>

    )
}
export default DigestaParagraphusViewer



