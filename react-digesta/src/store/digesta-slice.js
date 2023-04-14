import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    TOC: null,
    lexId: null,
    currentLex: null,
    jurists: null
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
        },
        setCurrentLex(state, action) {
            state.currentLex = action.payload
        },
        setJurists(state, action) {
            state.jurists = action.payload
        }
    }
    }

)

export const digestaActions = digestaSlice.actions;
export default digestaSlice