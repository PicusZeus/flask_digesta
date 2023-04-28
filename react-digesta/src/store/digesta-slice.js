import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    TOC: null,
    jurists: null,
    opera: null,
    chosenBookId: false,
    chosenTitulusId: false,
    chosenLexId: false,
    chosenParagraphKey: false,
    chosenJuristId: false,
    chosenOpusId: false
}


const digestaSlice = createSlice({
        name: "digesta",
        initialState: initialState,
        reducers: {
            setTOC(state, action) {
                state.TOC = action.payload
            },
            setJurists(state, action) {
                state.jurists = action.payload
            },
            setOpera(state, action) {
                state.opera = action.payload
            },
            setChosenBookId(state, action) {
                state.chosenBookId = action.payload
                state.chosenTitulusId = false
                state.chosenLexId = false
                state.chosenParagraphKey = false
                // redirect('/digesta')
            },
            setChosenTitulusId(state, action) {
                state.chosenTitulusId = action.payload
                state.chosenLexId = false
                state.chosenParagraphKey = false
                // redirect('/digesta')
            },
            setChosenLexId(state, action) {
                state.chosenLexId = action.payload
                state.chosenParagraphKey = false
            },
            setChosenParagraphKey(state, action) {
                state.chosenParagraphKey = action.payload
            },
            setChosenJuristId(state, action) {
                state.chosenJuristId = action.payload
            },
            setChosenOpusId(state, action) {
                state.chosenOpusId = action.payload
            }

        }
    }
)

export const digestaActions = digestaSlice.actions;
export default digestaSlice