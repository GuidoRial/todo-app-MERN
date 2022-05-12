import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { linkStyle } from "../../../../utils";
import "./Todo.css";
import Footer from "../../../Footer/Footer";
import { UserAndSetUserProps } from "../../../../interfaces/UserAndSetUserProps";

type TodoType = {
    name: string;
    completed: boolean;
    createdAt: string;
    createdBy: string;
    description: string;
    __V: number;
    _id: string;
};

const Todo = ({ user }: UserAndSetUserProps) => {
    const [individualTodo, setIndividualTodo] = useState<TodoType>({
        name: "Loading...",
        completed: false,
        createdAt: "today",
        createdBy: "me",
        description: "Loading...",
        __V: 0,
        _id: "string",
    });
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTodoName, setNewTodoName] = useState<string>("");
    const [newTodoDescription, setNewTodoDescription] = useState<string>("");
    const [newCompletionStatus, setNewCompletionStatus] =
        useState<boolean>(false);

    const navigate = useNavigate();
    let params = useParams();

    const deleteThisTodo = async () => {
        try {
            axios
                .delete(
                    `https://my-todo-app-mern.herokuapp.com/api/v1/todos/${params.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                )
                .then((res) => {
                    navigate("/");
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            axios.patch(
                `https://my-todo-app-mern.herokuapp.com/api/v1/todos/${params.id}`,
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
            );

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getTodo = async () => {
            try {
                axios
                    .get(
                        `https://my-todo-app-mern.herokuapp.com/api/v1/todos/${params.id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                            },
                        }
                    )
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
        <section className="individual-todo-container">
            <div className="individual-todo">
                <h2 className="individual-todo-text">{individualTodo?.name}</h2>
                <h4 className="individual-todo-text">
                    {individualTodo?.description}
                </h4>
                <div className="button-container">
                    <button
                        className="individual-todo-buttons "
                        id="editTodoButton"
                        onClick={() => setEditMode(!editMode)}
                    >
                        EDIT
                    </button>
                    <button
                        className="individual-todo-buttons "
                        onClick={deleteThisTodo}
                        id="deleteTodoButton"
                    >
                        DELETE
                    </button>
                    <Link to={"/"} style={linkStyle}>
                        <button
                            className="individual-todo-buttons"
                            id="goBackButton"
                        >
                            CLOSE
                        </button>
                    </Link>{" "}
                </div>
                {editMode && (
                    <form className="form-edit-todo" onSubmit={handleEditTodo}>
                        <input
                            className="input-field-edit-todo"
                            type="text"
                            placeholder="New todo name..."
                            onChange={(e) => setNewTodoName(e.target.value)}
                        />
                        <input
                            className="input-field-edit-todo"
                            type="text"
                            placeholder="New todo description"
                            onChange={(e) =>
                                setNewTodoDescription(e.target.value)
                            }
                        />
                        <div className="completed-edit-todo">
                            Completed:
                            <input
                                type="checkbox"
                                defaultChecked={individualTodo?.completed}
                                onChange={(e) =>
                                    setNewCompletionStatus(e.target.checked)
                                }
                            />
                        </div>
                        <button
                            type="submit"
                            className="individual-todo-buttons"
                            id="submitEditedTodoButton"
                        >
                            Edit Todo
                        </button>
                    </form>
                )}
            </div>

            <div className="todo-footer"></div>

            <Footer />
        </section>
    );
};

export default Todo;
