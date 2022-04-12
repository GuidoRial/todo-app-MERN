import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Main/Footer/Footer";

function SignUp({ user, setUser }) {
    const [username, setUsername] = useState("");
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

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post("http://localhost:4000/api/v1/auth/register", {
                    username,
                    email,
                    password,
                })
                .then((res) => {
                    navigate("/login");
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="sign-up-page">
            <h1>Sign Up</h1>
            <div className="form-container">
                <form className="form" onSubmit={handleCreateAccount}>
                    <input
                        className="input-field"
                        id="username"
                        type="text"
                        placeholder="Enter your username..."
                        onChange={(e) => setUsername(e.target.value)}
                    />

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
                        Create Account
                    </button>
                </form>
                <div className="account-check">
                    <p>Already have an account?</p>
                    <Link to="/login">Log In</Link>
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default SignUp;
