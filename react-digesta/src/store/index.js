import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";
import digestaSlice from "./digesta-slice";
import commentsSlice from "./comments-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        digesta: digestaSlice.reducer,
        comments: commentsSlice.reducer
    }
})

export default store

