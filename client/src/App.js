import "./App.css"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register"
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"

import { Routes, Route, Navigate, Router } from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { io } from "socket.io-client";

import { useEffect, useState } from "react";



function App() {

  const { user } = useSelector(
    (state) => state.auth
  )

  //socket 
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:3006"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

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
