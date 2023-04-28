import {createSlice} from "@reduxjs/toolkit";

const initialState = {

    userId: null,
    username: null,
    commentedParagraphi: [],
}


const authSlice = createSlice({
        name: 'auth',
        initialState: initialState,
        reducers: {
            setUserData(state, action) {
                const {paragraphi, user_id, username} = action.payload

                state.commentedParagraphi = paragraphi
                state.userId = user_id
                state.username = username
            },


            setCommentedParagraphi(state, action) {
                state.commentedParagraphi = action.payload
            },

            resetToken(state) {
                state.commentedParagraphi = null
                state.userId = null
                state.username = null
            }
        }
    }
)

export const authActions = authSlice.actions;

export default authSlice