import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    TOC: null,
    lexId: null
}


const digestaSlice = createSlice({
    name: "digesta",
    initialState: initialState,
    reducers: {
        setTOC(state, action) {
            state.TOC = action.payload
        },
        setLexId(state, action) {
            state.lexId = action.payload
        }
    }
    }

)

export const digestaActions = digestaSlice.actions;
export default digestaSlice