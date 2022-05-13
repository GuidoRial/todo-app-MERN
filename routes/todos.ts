import express from "express";
const router = express.Router();

import {
    getAllTodos,
    createTodo,
    getTodo,
    deleteTodo,
    updateTodo,
} from "../controllers/todos";

router.route("/").get(getAllTodos).post(createTodo);
router.route("/:id").get(getTodo).patch(updateTodo).delete(deleteTodo);

export = router;
