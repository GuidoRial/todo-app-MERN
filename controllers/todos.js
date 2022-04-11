const Todo = require("../models/Todo");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors/");

const getAllTodos = async (req, res) => {
    const todos = await Todo.find({ createdBy: req.user.userId }).sort(
        "createdAt"
    );
    res.status(StatusCodes.OK).json({ todos, count: todos.length });
};

const createTodo = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const todo = await Todo.create(req.body);
    res.status(StatusCodes.CREATED).json({ todo });
};

const getTodo = async (req, res) => {};

const deleteTodo = async (req, res) => {};

const updateTodo = async (req, res) => {};

module.exports = { getAllTodos, createTodo, getTodo, deleteTodo, updateTodo };
