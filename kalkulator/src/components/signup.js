import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./signin.css"

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signup", {
                username,
                email,
                password
            });
            if (response.status == 200) {
                navigate('/')
            } else {
                alert('Gagal Register')
            }
        } catch (error) {
            console.log(error);
        }
    };
    if (sessionStorage.length === 1) {
        navigate('kalkulator')
    }
    return (
        <div className="signup">
            <h2>Register Form</h2>
            <form onSubmit={registerUser}>
                <div className="container">
                    <label><b>Username</b></label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />

                    <label><b>Email</b></label>
                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                    />

                    <label><b>Password</b></label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <button type="submit">Daftar</button>
                </div>

                <div className="container">
                    <button type="button" className="cancelbtn">Login</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;