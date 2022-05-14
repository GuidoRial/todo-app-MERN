import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import {
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
} from "../errors";
import express, { Request, Response, NextFunction } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create({ ...req.body }); //mongoose does all the validation
    const token = user.createJWT();
    //Use this function to hash the password
    res.status(StatusCodes.CREATED).json({
        user: { username: user.username },
        token,
    });
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFoundError(`${email} was not found in database`);
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid credentials");
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: { username: user.username },
        token,
    });
};

export { register, login };
