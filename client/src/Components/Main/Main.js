import React, { useEffect, useState } from "react";
import axios from "axios";


import Header from "./Header/Header";

import Todos from "./Todos/Todos";
import "./Main.css";
function Main({ user, setUser }) {
    const [newTodoName, setNewTodoName] = useState("");
    const [newTodoDescription, setNewTodoDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [addTodoMode, setAddTodoMode] = useState(false);

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
                        localStorage.setItem("todos", JSON.stringify(res.data));
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
                    const data = localStorage.getItem("todos");
                    const clone = JSON.parse(data);
                    const newTodo = res.data.todo;
                    setTodos([...clone, newTodo]);
                    localStorage.setItem("todos", JSON.stringify(todos));
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Header user={user} setUser={setUser} />
            <section className="main">
                {user && <Todos todos={todos} />}
                <button
                    onClick={() => setAddTodoMode(!addTodoMode)}
                    className="main-buttons"
                    id="createTodoButton"
                >
                    New todo
                </button>

                {addTodoMode && (
                    <form
                        className="add-new-todo-form"
                        onSubmit={handleAddTodo}
                    >
                        <input
                            className="input-field-new-todo"
                            placeholder="What do you need to do?"
                            onChange={(e) => setNewTodoName(e.target.value)}
                        />
                        <input
                            className="input-field-new-todo"
                            placeholder="Todo description..."
                            onChange={(e) =>
                                setNewTodoDescription(e.target.value)
                            }
                        />
                        <button
                            className="main-buttons"
                            id="sendNewTodoButton"
                            type="submit"
                        >
                            Add Todo
                        </button>
                    </form>
                )}
            </section>
        </>
    );
}

export default Main;
