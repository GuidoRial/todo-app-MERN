const Todo = require("../models/Todo");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors/");

const getAllTodos = async (req, res) => {
    //get all todos created by this user
    const todos = await Todo.find({ createdBy: req.user.userId }).sort(
        "createdAt"
    );
    res.status(StatusCodes.OK).json({ todos, count: todos.length });
};

const createTodo = async (req, res) => {
    //Add a todo by this user
    req.body.createdBy = req.user.userId;
    const todo = await Todo.create(req.body);
    res.status(StatusCodes.CREATED).json({ todo });
};

const getTodo = async (req, res) => {
    const {
        user: { userId },
        params: { id: todoId },
    } = req;

    const todo = await Todo.findOne({ _id: todoId }, { createdBy: userId });
    if (!todo) {
        throw new NotFoundError(`No todo with id: ${todoId}`);
    }
};

const deleteTodo = async (req, res) => {
    const {
        user: { userId },
        params: { id: todoId },
    } = req;

    const todo = await Todo.findOneAndRemove({
        _id: todoId,
        createdBy: userId,
    });

    if (!todo) {
        throw new NotFoundError(`No todo with id: ${todoId}`);
    }
    res.status(StatusCodes.OK).send();
};

const updateTodo = async (req, res) => {
    const { id: todoId } = req.params;

    const todo = await Todo.findOneAndUpdate({ _id: todoId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!todo) {
        throw new NotFoundError(`No todo with id: ${todoId}`);
    }
    res.status(StatusCodes.OK).send();
};

module.exports = { getAllTodos, createTodo, getTodo, deleteTodo, updateTodo };
