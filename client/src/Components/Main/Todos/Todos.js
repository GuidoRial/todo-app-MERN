import React from "react";
import { Link } from "react-router-dom";
import "./Todos.css";
import { linkStyle } from "../../../aux";
import uniqid from "uniqid";

function Todos({ todos }) {
    return (
        <div className="todo-container">
            {todos.map((todo) => (
                <Link to={`/todos/${todo._id}`} style={linkStyle}>
                    <div
                        key={uniqid()}
                        className="todo"
                        style={{
                            textDecorationLine:
                                todo.completed === true
                                    ? "line-through"
                                    : "none",
                            textDecorationStyle:
                                todo.completed === true ? "solid" : "none",
                        }}
                    >
                        {todo.name}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Todos;
