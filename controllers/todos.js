const Todo = require("../models/Todo");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors/");

const getAllTodos = async (req, res) => {
    const todos = await Todo.find({ createdBy: req.user.userId }).sort(
        "createdAt"
    );
    res.status(StatusCodes.OK).json(todos);
};

const createTodo = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const todo = await Todo.create(req.body);
    res.status(StatusCodes.CREATED).json({ todo });
};

const getTodo = async (req, res) => {
    const {
        user: { userId },
        params: { id: todoId },
    } = req;
    const todo = await Todo.findOne({ _id: todoId, createdBy: userId });
    if (!todo) {
        throw new NotFoundError(`No todo with id ${todoId}`);
    }

    res.status(StatusCodes.OK).json(todo);
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
        throw new NotFoundError(`No todo with id ${todoId}`);
    }
    res.status(StatusCodes.OK).json(todo);
};

const updateTodo = async (req, res) => {
    const {
        body: { name, description },
        user: { userId },
        params: { id: todoId },
    } = req;

    if (name === "" || description === "") {
        throw new BadRequestError("Name or description can't be empty");
    }

    const todo = await Todo.findByIdAndUpdate(
        { _id: todoId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!todo) {
        throw new NotFoundError(`No todo with id ${todoId}`);
    }

    res.status(StatusCodes.OK).json({ todo });
};

module.exports = { getAllTodos, createTodo, getTodo, deleteTodo, updateTodo };
