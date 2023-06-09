import axios from "axios";
import tokenService from "../services/token.service";
import TokenService from "../services/token.service";
import {json} from "react-router-dom";

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
            }
        })
}

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
    }).then(() => {
    })
}


export const getParagraph = (id) => {
    return api.get("digesta/paragraphi/" + id)
        .then(response => {
                return response.data
            }
        ).catch(() => {
            throw json(
                {message: "Nie udało się załadować danych dla tego paragrafu"},
                {status: 500}
            )
        })
}

export const getTituliAuthor = (book_id, author_id) => {
    return api.get(`digesta/tituli/author/${book_id}/${author_id}`).then(response => {
        return response.data
    })
}

export const getLegesAuthor = (titulusId, authorId) => {
    return api.get(`digesta/titulus/leges/author/${titulusId}/${authorId}`).then(response => {
        return response.data
    })
}

export const getReplies = (id, username) => {

    if (username) {
        const token = tokenService.getLocalAccessToken()
        return api.get("comment/comments/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.data)
    } else {
        return api.get("comment/comments/" + id)
            .then(response => {
                return response.data
            })
    }
}

export const getJurist = (id) => {
    return api.get(`authors/${id}`).then((response) => {
        return response.data
    }).catch(() => {
        throw json(
            {message: 'Nie udało się załadować danych dla tego jurysty'},
            {status: 500}
        )
    })
}

export const getJuristBooks = (id) => {
    return api.get("digesta/books/author/" + id).then((response) => {
        return response.data
    }).catch((e) => {
        throw json(
            {message: "Nie udało się załadować spisu treści Digestów dla jurysty"},
            {status: 500}
        )
    })
}

export const getJuristOpera = (id) => {
    return api.get("opera/jurist/" + id).then(response => {
        return response.data
    }).catch((e) => {
        throw json(
            {message: "Nie udało załadować się spisu prac jurysty"},
            {status: e.status}
        )
    })
}

export const getJurists = () => {
    return api.get("authors").then((response) => {
        return response.data
    }).catch(() => {
            throw json(
                {message: "Nie udało się załadować listy jurystów"},
                {status: 500}
            )
        }
    )
}

export const getOpera = () => {
    return api.get("opera").then((response) => {
        return response.data
    }).catch(() => {
        throw json(
            {message: "Nie udało się załadować listy prac jurystów"},
            {status: 500}
        )
    })
}

export const getBooks = () => {
    return api.get("digesta/books").then((response) => {
        return response.data
    }).catch(() => {
        throw json(
            {message: "Nie udało się załadować spisu treści Digestów"},
            {status: 500}
        )
    })
}

export const getLeges = (id) => {

    return api.get("digesta/titulus/leges/" + id).then((response) => {
        return response.data
    })

}

export const getLegesOpus = (id) => {
    return api.get("digesta/opus/leges/" + id).then(response => {
        return response.data
    })
}