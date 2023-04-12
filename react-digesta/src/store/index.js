import { createStore } from 'redux';
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    counter: 0,
    logging: false
}

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: initialState,
    reducers: {
        loggingToggle(state) {
            console.log('inside', state.logging)
            state.logging = !state.logging
            console.log('after', state.logging)
        }
    }
})
// const myReducer = (state = initialState, action) => {
//     if (action.type === "increment") {
//         return {
//             counter: state.counter + 1
//         }
//     }
//
//     if (action.type === 'decrement') {
//         return {
//             counter: state.counter - 1
//         }
//     }
//
//     if (action.type === 'loggingToggle') {
//         return {
//             logging: !state.logging
//         }
//     }
//
//
//     return state
//
// }


const store = configureStore({
    reducer: {
        authorization: authorizationSlice.reducer
    }
})

export const authorizationActions = authorizationSlice.actions
export default store

