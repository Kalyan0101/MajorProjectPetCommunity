import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice.store.js"
import postsReducer from "../store/postsSlice.store.js"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    }
})