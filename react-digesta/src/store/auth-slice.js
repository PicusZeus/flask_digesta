import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    tokens: {
        access_token: null,
        refresh_token: null
    },
    tokenFresh: false,
    tokenExpiration: null,
    loggedIn: false
}


const authSlice = createSlice({
        name: 'auth',
        initialState: initialState,
        reducers: {
            setToken(state, action) {

                state.loggedIn = true
                state.tokens = action.payload
                state.tokenFresh = true
                state.tokenExpiration = null


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
            }
        }
    }
)

export const authActions = authSlice.actions;

export default authSlice