import React, {useEffect} from 'react';
import {useState} from "react";
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Home, Landing, Login, Signup} from "./screens";

function App() {
    const [user, setUser] = useState({
        email: false
    });

    useEffect(() => {
        const theUser = localStorage.getItem("user");

        if (theUser && !theUser.includes("undefined")) {
            setUser(JSON.parse(theUser));
        }
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={user?.email ? <Navigate to="/home"/> : <Landing/>}
                />
                <Route
                    path="/signup"
                    element={user?.email ? <Navigate to="/home"/> : <Signup/>}
                />
                <Route
                    path="/login"
                    element={user?.email ? <Navigate to="/home"/> : <Login/>}
                />
                <Route
                    path="/home"
                    element={user?.email ? <Home user={user}/> : <Navigate to="/"/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
