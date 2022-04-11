import React from "react";
import { Link } from "react-router-dom";

function Todos({ todos }) {
    console.log(todos);

    return (
        <>
            {todos.map((todo) => (
                <Link to={`/todos/${todo._id}`}>
                    <div key={todo._id}>
                        {todo.name}, {todo.description}
                    </div>
                </Link>
            ))}
        </>
    );
}

export default Todos;
