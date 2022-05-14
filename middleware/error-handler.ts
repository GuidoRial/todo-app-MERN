import { StatusCodes } from "http-status-codes";
import express, { Request, Response, NextFunction } from "express";
type codeError = {
    statusCode: any;
    message: any;
    name: string;
    errors: { [s: string]: any } | ArrayLike<unknown>;
    code: number;
    keyValue: {};
    value: any;
};

const errorHandlerMiddleware = (
    err: codeError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, try again later",
    };

    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
        customError.statusCode = 400;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`;
        customError.statusCode = 400;
    }
    if (err.name === "CastError") {
        customError.msg = `No item found with id: ${err.value}`;
        customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
