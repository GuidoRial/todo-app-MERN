import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Main({ user, setUser }) {
    const navigate = useNavigate();
    const handleLogOut = () => {
        setUser({});
        navigate("/login");
    };
    console.log(user);
    return (
        <div>
            {user?.user?.username || "Todo app"}
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    );
}

export default Main;
