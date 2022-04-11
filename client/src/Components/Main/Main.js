import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Main({ user, setUser }) {
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem("user");
        // Check if a user is stored on localStorage, if they are, then they'll be redirected to dashboard and viceversa
        if (data) {
            setUser(JSON.parse(data));
        }
    }, []);

    const handleLogOut = () => {
        setUser(null);
        localStorage.removeItem("user");
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
