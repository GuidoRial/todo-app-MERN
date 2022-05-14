import { Request, Response } from "express";

import Todo from "../models/Todo";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/";
import { GetUserInfoRequestInterface } from "../interfaces/GetUserAuthInfoRequestInterface";

export const getAllTodos = async (req: GetUserInfoRequestInterface, res: Response) => {
    const todos = await Todo.find({ createdBy: req.user.userId }).sort(
        "createdAt"
    );
    res.status(StatusCodes.OK).json(todos);
};

export const createTodo = async (req: GetUserInfoRequestInterface, res: Response) => {
    req.body.createdBy = req.user.userId;
    const todo = await Todo.create(req.body);
    res.status(StatusCodes.CREATED).json({ todo });
};

export const getTodo = async (req: GetUserInfoRequestInterface, res: Response) => {
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

export const deleteTodo = async (req: GetUserInfoRequestInterface, res: Response) => {
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

export const updateTodo = async (req: GetUserInfoRequestInterface, res: Response) => {
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

