import React from "react";
import { Link } from "react-router-dom";


function Todos({ todos }) {


    return (
        <div>
            {todos.map((todo) => (
                <Link to={`/todos/${todo._id}`}>
                    <div key={todo._id}>
                        {todo.name}, {todo.description}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Todos;
