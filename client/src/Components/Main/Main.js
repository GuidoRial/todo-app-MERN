import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Main({ user, setUser }) {
    const [newTodoName, setNewTodoName] = useState("");
    const [newTodoDescription, setNewTodoDescription] = useState("");
    const [todos, setTodos] = useState([]);

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

    const handleAddTodo = async (e) => {
        e.preventDefault();
        try {
            axios
                .post(
                    "http://localhost:4000/api/v1/todos/",
                    {
                        name: newTodoName,
                        description: newTodoDescription,
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
            <Header user={user} setUser={setUser} />

            <form onSubmit={handleAddTodo}>
                <input
                    placeholder="New Todo Name..."
                    onChange={(e) => setNewTodoName(e.target.value)}
                />
                <input
                    placeholder="New Todo Description..."
                    onChange={(e) => setNewTodoDescription(e.target.value)}
                />
                <button type="submit">Add Todo</button>
            </form>

            <Footer />
        </div>
    );
}

export default Main;
