import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const bcrypt = require("bcryptjs");

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogIn = (e) => {
        e.preventDefault();
        try {
            axios
                .post("http://localhost:4000/login", { email, password })
                .then((res) => {
                    console.log("Logged in");
                    navigate("/");
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="log-in-page">
            <h1>Log In</h1>
            <div className="form-container">
                <form className="form" onSubmit={handleLogIn}>
                    <input
                        className="input-field"
                        id="email"
                        type="text"
                        placeholder="Enter your e-mail..."
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="input-field"
                        id="password"
                        type="password"
                        placeholder="Enter your password..."
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="form-button"
                        id="actionButton"
                    >
                        Login
                    </button>
                </form>
                <div className="account-check">
                    <p>Don't have an account?</p>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        </section>
    );
}

export default Login;
