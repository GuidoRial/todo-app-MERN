import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";
import { JwtPayloadInterface } from "../interfaces/JwtPayloadInterface.js";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    // Check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnauthenticatedError("Authentication Invalid");
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        ) as JwtPayloadInterface;
        //Attach the user to the todo routes
        req.user = { userId: payload.userId, name: payload.name };
        next();
    } catch (err) {
        console.log(err);
        throw new UnauthenticatedError("Authentication Invalid");
    }
};

export default auth;
