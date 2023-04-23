import {useLoaderData} from "react-router-dom";
import {json} from "react-router-dom";
import CommentViewer from "../commentViewer/CommentViewer";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {commActions} from "../../store/comments-slice";
import NewComment from "../newComment/NewComment";
import {loadComments} from "../../store/comments-actions";


const DigestaParagraphusViewer = (props) => {
    const dispatch = useDispatch()
    let paragraphus = useLoaderData()
    if (props.paragraphus) {
        paragraphus = props.paragraphus
    }
    useEffect(()=>{
        dispatch(loadComments(false, paragraphus.id))

    }, [dispatch, paragraphus])
    // dispatch(commActions.setComments(paragraphus.comments))
    const comments = useSelector(state=>state.comments.paragraphComments)
    return (
        <>
            <div>Paragraf</div>
            <div>{paragraphus.text_lat}</div>
            <h4>comments</h4>
            <ul>
                <NewComment paragraphusId={paragraphus.id}/>
                {comments && comments.map((comment)=>(<CommentViewer comment={comment}/>))}

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

