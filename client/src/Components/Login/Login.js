import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return (
        <section className="log-in-page">
            <h1>Log In</h1>
            <div className="form-container">
                <form className="form">
                    <input
                        className="input-field"
                        id="username"
                        type="text"
                        placeholder="Enter your username..."
                    />

                    <input
                        className="input-field"
                        id="email"
                        type="text"
                        placeholder="Enter your e-mail..."
                    />

                    <input
                        className="input-field"
                        id="password"
                        type="password"
                        placeholder="Enter your password..."
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
                    <p>Already have an account?</p>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        </section>
    );
}

export default Login;
