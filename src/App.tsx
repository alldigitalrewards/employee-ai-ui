import React, {useEffect} from 'react';
import {useState} from "react";
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Home, Landing, Login, Signup} from "./screens";
import jwtDecode, { JwtPayload } from "jwt-decode";

function App() {
    const [user, setUser] = useState({
        email: false
    });

    const checkToken = () => {
        const userJson = localStorage.getItem("user");

        if (userJson && !userJson.includes("undefined")) {
            const user = JSON.parse(userJson);
            const decoded = jwtDecode<JwtPayload>(user.token);
            if(decoded.exp !== undefined && decoded.exp < Date.now() / 1000) {
                localStorage.removeItem("user");
                window.location.reload();
            }
        }
    }

    useEffect(() => {
        const theUser = localStorage.getItem("user");

        if (theUser && !theUser.includes("undefined")) {
            setUser(JSON.parse(theUser));
            setTimeout(() => {
                checkToken();
            }, 10000);
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
