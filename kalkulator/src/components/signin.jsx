import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./signin.css"


function SignIn() {
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signin", {
                username,
                password
            });
            if (response.status == 200) {
                sessionStorage.setItem("_token", response.data.accessToken);
                navigate('kalkulator')
            } else {
                alert('Email tidak tersedia')
            }
        } catch (error) {
            console.log(error);
        }
    };
    if (sessionStorage.length === 1) {
        navigate('kalkulator')
    }
    return (
        <div className="login">
            <h2>Login Form</h2>
            <form onSubmit={loginUser}>
                <div className="container">
                    <label><b>Username</b></label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Username"
                    />

                    <label><b>Password</b></label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <button type="submit">Login</button>
                </div>

                <div className="container">
                    <button type="button" className="cancelbtn">Daftar</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;