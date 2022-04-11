import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Main({ user, setUser }) {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllTodos = async () => {
            try {
                axios
                    .get("http://localhost:4000/api/v1/todos/", {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    })
                    .then((res) => {
                        console.log(res.data);
                        setTodos(res.data);
                    });
            } catch (err) {
                console.log(err);
            }
        };
        const data = localStorage.getItem("user");
        // Check if a user is stored on localStorage, if they are, then they'll be redirected to dashboard and viceversa
        if (data) {
            setUser(JSON.parse(data));
            getAllTodos();
        }
    }, []);

    console.log(todos);

    const handleLogOut = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        try {
            axios
                .post(
                    "http://localhost:4000/api/v1/todos/",
                    {
                        name: newTodo
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                )
                .then((res) => {
                    setTodos([...todos, res.data]);
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {user?.user?.username || "Todo app"}
            <button onClick={handleLogOut}>Log Out</button>
            <form onSubmit={handleAddTodo}>
                <input
                    placeholder="New Todo Name..."
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
}

export default Main;
