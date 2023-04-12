import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    logging: false,
    notification: null,
    registering: false,

}



const uiSlice = createSlice({
        name: 'ui',
        initialState: initialState,
        reducers: {
            logingToggle(state) {
                state.logging = !state.logging
            },
            registeringToggle(state) {
                state.registering = !state.registering
            },
            setNotification(state, action) {
                console.log('setting')

                state.notification = {
                    status: action.payload.status,
                    title: action.payload.title,
                    message: action.payload.message
                }
            }
        }
    }
)

export const uiActions = uiSlice.actions;

export default uiSlice