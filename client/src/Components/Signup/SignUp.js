import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post("http://localhost:4000/signup", {
                    username,
                    email,
                    password,
                })
                .then((res) => {
                    console.log("Account created");
                    navigate("/");
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
        </section>
    );
}

export default SignUp;
