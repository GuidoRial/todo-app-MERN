import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ user, setUser }) {
    const navigate = useNavigate();
    const handleLogOut = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };
    return (
        <nav>
            <h1>Todo App</h1>
            <div className="greeting">
                <h3>Hello, {user?.user?.username}!</h3>
                <button onClick={handleLogOut}>
                    <i className="fas fa-power-off"></i>
                </button>
            </div>
        </nav>
    );
}

export default Header;
