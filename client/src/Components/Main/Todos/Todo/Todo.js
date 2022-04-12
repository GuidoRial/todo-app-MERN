import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Todo({ user }) {
    const [individualTodo, setIndividualTodo] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [newTodoName, setNewTodoName] = useState("");
    const [newTodoDescription, setNewTodoDescription] = useState("");
    const [newCompletionStatus, setNewCompletionStatus] = useState(false);
    console.log(newCompletionStatus);
    const navigate = useNavigate();
    let params = useParams();

    const deleteThisTodo = async () => {
        try {
            axios
                .delete(`http://localhost:4000/api/v1/todos/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                .then((res) => {
                    console.log("Todo deleted successfully");
                    navigate("/");
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditTodo = async (e) => {
        e.preventDefault();

        try {
            axios
                .patch(
                    `http://localhost:4000/api/v1/todos/${params.id}`,
                    {
                        name: newTodoName || individualTodo.name,
                        description:
                            newTodoDescription || individualTodo.description,
                        completed: newCompletionStatus,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log("Todo edited successfully", res.data.todo);
                    navigate("/");
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getTodo = async () => {
            try {
                axios
                    .get(`http://localhost:4000/api/v1/todos/${params.id}`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    })
                    .then((res) => {
                        setIndividualTodo(res.data);
                    });
            } catch (err) {
                console.log(err);
            }
        };

        getTodo();
    }, [params.id]);

    return (
        <div>
            <Link to={"/"}>Go back</Link>
            <button onClick={() => setEditMode(!editMode)}>Edit Todo</button>
            <button onClick={deleteThisTodo}>Delete todo</button>
            {individualTodo ? (
                <p>
                    {individualTodo.name}, {individualTodo.description}
                </p>
            ) : (
                <p>Loading...</p>
            )}

            {editMode && (
                <form onSubmit={handleEditTodo}>
                    <input
                        type="text"
                        placeholder="New todo name..."
                        onChange={(e) => setNewTodoName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="New todo description"
                        onChange={(e) => setNewTodoDescription(e.target.value)}
                    />
                    <input
                        type="checkbox"
                        defaultChecked={individualTodo?.completed}
                        onChange={(e) =>
                            setNewCompletionStatus(e.target.checked)
                        }
                    />
                    <button type="submit">Edit Todo</button>
                </form>
            )}
        </div>
    );
}

export default Todo;
