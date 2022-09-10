import "./App.css"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register"
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"
import VisualizeCompare from "./pages/profile/VisualizeCompare";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import { Routes, Route, Navigate, Router } from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { io } from "socket.io-client";

import { useEffect, useState,useRef } from "react";



function App() {

  const { user } = useSelector(
    (state) => state.auth
  )

  //socket 
  const socket = useRef(io("http://localhost:3006"));

  useEffect(() => {
        
       

        socket.current.emit("newUser", user?.user);

        // socket.current.on("getUsersDetails", (users) => {
        //   console.log(users + 'bhuuuu ');
        // })

    }, [user]);

  //

  return (
    <div className="App">
      {/* <Home/> */}
      {/* <Profile/> */}
      {/* <Login/> */}
      {/* <Register/> */}
      
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">

        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="home" /> : <Navigate to="login" />}
          />
          <Route
            path="/home"
            element={user ? <Home socket={socket} /> : <Navigate to="../login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="../home" /> : <Login />}
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="../login" />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="../home" /> : <Register />}
          />
          <Route
            path="/visualize"
            element={user ? <VisualizeCompare/> : <Navigate to="../login" />}
          />
          <Route
            path="/forgotpassword"
            element={user ? <Navigate to="../home" /> : <ForgotPassword/>}
          />
          <Route
            path="/reset/:token"
            element={user ? <Navigate to="../home" /> : <ResetPassword/>}
          />

        
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />

        </Routes>

      </SkeletonTheme>
      

      <ToastContainer/>

      
      

    </div>
  );
}

export default App;
