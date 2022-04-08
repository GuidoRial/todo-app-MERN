import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
    return (
        <section className="sign-up-page">
            <h1>Sign Up</h1>
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
