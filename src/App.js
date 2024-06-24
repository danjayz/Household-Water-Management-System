import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/Dashboard/Navbar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Settings from "./Pages/Settings/Settings";

import React, { useEffect } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Login from "./Pages/login";
import SignUp from "./Components/register";

// import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Profile from "./Components/profile";

import { useState } from "react";
import { auth } from "./Components/firebase";

function App() {
    const [user, setUser] = useState();
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        });
    });
    return (
        <div className="App">
            <BrowserRouter>
                {user && <Navbar />}{" "}
                {/* Render Navbar only if user is logged in */}
                <Routes>
                    <Route
                        path="/"
                        element={
                            user ? <Navigate to="/dashboard" /> : <Login />
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<SignUp />} />
                    {user && ( // Render protected routes only if user is logged in
                        <>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/settings" element={<Settings />} />
                        </>
                    )}
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </div>
    );
}

export default App;
