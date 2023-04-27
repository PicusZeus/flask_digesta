import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    // tokens: {
    //     access_token: null,
    //     refresh_token: null
    // },
    access_token: null,
    refresh_token: null,
    tokenFresh: false,
    tokenExpiration: null,
    userId: null,
    username: null,
    loggedIn: false,
    commentedParagraphi: [],
}


const authSlice = createSlice({
        name: 'auth',
        initialState: initialState,
        reducers: {
            setUserData(state, {access_token, paragraphi, refresh_token, user_id, username}) {
                state.access_token = access_token
                state.commentedParagraphi = paragraphi
                state.refresh_token = refresh_token
                state.userId = user_id
                state.username = username
            },

            setToken(state, action) {

                state.access_token = action.payload
                // state.loggedIn = true
                // state.tokens = {
                //     access_token: action.payload.access_token,
                //     refresh_token: action.payload.refresh_token
                // }
                // state.tokenFresh = true
                // state.tokenExpiration = null
                // state.userId = action.payload.userId
                // state.username = action.payload.username
                //

            },
            setCommentedParagraphi(state, action) {
                state.commentedParagraphi = action.payload
            },

            resetToken(state) {
                console.log('resetting')
                state.loggedIn = false
                state.tokens = {
                    access_token: null,
                    refresh_token: null
                }
                state.tokenFresh = false
                state.tokenExpiration = null
                state.userId = null
                state.username = null
            }
        }
    }
)

export const authActions = authSlice.actions;

export default authSlice