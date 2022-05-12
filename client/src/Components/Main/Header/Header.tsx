import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { UserAndSetUserProps } from "../../../interfaces/UserAndSetUserProps";

const Header: FC<UserAndSetUserProps> = ({ user, setUser }) => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };
    return (
        <nav>
            <h1 className="todo-logo">Todo App</h1>
            <div className="greeting">
                <h3>
                    Welcome, <span id="userName">{user?.user?.username}</span>!
                </h3>
                <div className="log-out-button-container">
                    <button className="log-out-button" onClick={handleLogOut}>
                        <i className="fas fa-power-off"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
