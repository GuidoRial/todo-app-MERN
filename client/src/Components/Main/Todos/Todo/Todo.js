import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Todo({ user }) {
    const [individualTodo, setIndividualTodo] = useState(null);
    const [editMode, setEditMode] = useState(false);
    let params = useParams();
    console.log(params.id);

    const handleEditTodo = async (e) => {
        e.preventDefault();
        try{
            axios
                .patch(`http://localhost:4000/api/v1/todos/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                .then((res) => {
                    setIndividualTodo(res.data);
                });
        }catch(err){console.log(err)}
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
    console.log(individualTodo);
    return (
        <div>
            <button onClick={() => setEditMode(!editMode)}>Edit Todo</button>
            {individualTodo ? (
                <p>
                    {individualTodo.name}, {individualTodo.description}
                </p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Todo;
