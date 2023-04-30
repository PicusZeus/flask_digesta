import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    logging: false,
    notification: false,
    registering: false,
    rerender: false

}


const uiSlice = createSlice({
        name: 'ui',
        initialState: initialState,
        reducers: {
            rerender(state) {
                state.rerender = !state.rerender
            },
            logingToggle(state) {
                state.logging = !state.logging
            },
            registeringToggle(state) {
                state.registering = !state.registering
            },
            setNotification(state, action) {

                state.notification = {
                    status: action.payload.status,
                    title: action.payload.title,
                    message: action.payload.message
                }

            },
            resetNotification(state) {
               state.notification = null
            }
        }
    }
)

export const uiActions = uiSlice.actions;

export default uiSlice