import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    paragraphComments: []
}


const commSlice = createSlice(
    {
        name: 'comments',
        initialState: initialState,
        reducers: {
            addComment(state, action) {
                state.paragraphComments = state.paragraphComments.push(action.payload)
            },
            setComments(state, action) {
                state.paragraphComments = action.payload
            }
        }
    }
)

export const commActions = commSlice.actions;

export default commSlice