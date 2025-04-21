import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice.store.js"

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})