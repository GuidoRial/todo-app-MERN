import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ user, setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem("user");
        // Check if a user is stored on localStorage, if they are, then they'll be redirected to dashboard
        if (data) {
            setUser(JSON.parse(data));
        }
    }, []);

    const demoUserEmail = "demouser@gmail.com";
    const demoUserPassword = "imademouser";

    const handleLogIn = (e) => {
        e.preventDefault();
        try {
            axios
                .post("http://localhost:4000/api/v1/auth/login", {
                    email,
                    password,
                })
                .then((res) => {
                    setUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                    navigate("/");
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleLoginWithDemoUser = async () => {
        try {
            axios
                .post("http://localhost:4000/api/v1/auth/login", {
                    email: demoUserEmail,
                    password: demoUserPassword,
                })
                .then((res) => {
                    setUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
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
                    <button onClick={handleLoginWithDemoUser}>DEMO USER</button>
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
