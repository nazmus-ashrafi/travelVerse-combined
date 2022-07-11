import "./App.css"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register"
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"

import { Routes, Route, Navigate, Router } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {


  return (
    <div className="App">
      {/* <Home/> */}
      {/* <Profile/> */}
      {/* <Login/> */}
      {/* <Register/> */}
      

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/profile/:id"
            element={<Profile />}
          />
          {/* <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          /> */}


        </Routes>

        <ToastContainer/>

      
      

    </div>
  );
}

export default App;
