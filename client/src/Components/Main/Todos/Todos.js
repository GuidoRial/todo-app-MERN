import React from "react";
import { Link } from "react-router-dom";
import "./Todos.css";
import { linkStyle } from "../../../aux";

function Todos({ todos }) {
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
