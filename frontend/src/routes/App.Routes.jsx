import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { Footer, Header } from "../components/shared/index.js";
import { Navbar } from "../components/layout/index.js";
import { useDispatch, useSelector } from 'react-redux'
import { SignupPrompt } from "../components/auth"
import authService from '../backend/auth';
import { logout as storeLogout, login as storeLogin } from '../store/authSlice.store.js';
import { setPosts } from '../store/postsSlice.js';
import Post from "../backend/post.backend.js";

const AppRoutes = () => {
    const dispatch = useDispatch();
    const isLoggedin = useSelector(state => state.auth.status)

    useEffect(() => {
        authService.getCurrentUser()
        .then((data) => {

            if (data.data) {
                dispatch(storeLogin(data.data));
            } else {
                dispatch(storeLogout());
            }

        })
        .catch((error) => { })
        
        Post.getAllPost()
        .then((posts) => {

            if(posts.success){
                dispatch(setPosts(posts.data))
            }
        })
        .catch(err => {
            console.log(err);                    
        });

    }, [])

    return (
        <>
            <Header />
            {!isLoggedin && <SignupPrompt />}
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
};

export default AppRoutes;