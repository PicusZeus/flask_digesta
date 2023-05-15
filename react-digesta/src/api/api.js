import axios from "axios";
import tokenService from "../services/token.service";
import TokenService from "../services/token.service";

export default axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
});


const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
});

export const deleteComment = (id) => {
    const token = tokenService.getLocalAccessToken()
    return api.delete("comment/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
}

export const getComments = (id, username) => {
    const token = tokenService.getLocalAccessToken()
    if (username) {
        return api.get(`comment/paragraphus/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.data)
    } else {
        return api.get(`comment/paragraphus/${id}`)
            .then(response => response.data)
    }
}
export const postComment = ({newComment, isPrivate, id}) => {
    const token = tokenService.getLocalAccessToken()
    return api.post(`comment/paragraphus/${id}`, {
        comment: newComment,
        private: isPrivate,
        "reply_to_comment_id": null
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.data
        })

}

export const saveEditedComment = ({newText, id}) => {
        const token = TokenService.getLocalAccessToken()
        return api.put(`comment/${id}`,
                {
                    comment: newText
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }})}

export const likeComment = (comment_id) => {
    console.log(comment_id, "COMID")
    const token = TokenService.getLocalAccessToken()
    return api.post("like", {
        comment_id: comment_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }).then(()=>{})
}