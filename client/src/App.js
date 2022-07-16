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



function App() {

  const { user } = useSelector(
    (state) => state.auth
  )

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
            element={user ? <Home /> : <Navigate to="../login" />}
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
