import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    isEmpty: true
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.isEmpty = false;
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload)
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload)
        }
    }
})

export default postsSlice.reducer;
export const { setPosts, addPost, deletePost } = postsSlice.actions;