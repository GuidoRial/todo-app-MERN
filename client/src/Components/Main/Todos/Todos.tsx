import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./Todos.css";
import { linkStyle } from "../../../utils";
import { TodosProps } from "../../../interfaces/Todos";

const Todos: FC<TodosProps> = ({ todos }) => {
    return (
        <div className="todo-container">
            {todos.map((todo) => (
                <Link to={`/todos/${todo._id}`} style={linkStyle}>
                    <div
                        key={todo._id}
                        className="todo"
                        style={{
                            textDecorationLine:
                                todo.completed === true
                                    ? "line-through"
                                    : "none",
                        }}
                    >
                        {todo.name}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Todos;
