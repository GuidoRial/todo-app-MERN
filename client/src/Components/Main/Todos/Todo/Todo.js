import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Todo({ user }) {
    const [individualTodo, setIndividualTodo] = useState(null);
    let params = useParams();
    console.log(params.id);

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
    }, []);
    console.log(individualTodo);
    return (
        <div>
            {individualTodo.name}, {individualTodo.description}
        </div>
    );
}

export default Todo;
