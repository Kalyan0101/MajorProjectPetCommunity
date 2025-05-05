import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { Footer, Header } from "../components/shared/index.js";
import { Navbar } from "../components/layout/index.js";
import { useDispatch, useSelector } from 'react-redux'
import { SignupPrompt } from "../components/auth"
import authService from '../backend/auth';
import { logout as storeLogout, login as storeLogin } from '../store/authSlice.store';

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
  }, [])

  return(
    <>
      <Header />
      { !isLoggedin && <SignupPrompt /> }
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
};

export default AppRoutes;