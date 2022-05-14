require("express-async-errors");

import path from "path";
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

import express, { Request, Response } from "express";
const app = express();
import morgan from "morgan";
import connectDB from "./database/connect";
import cors from "cors";

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

import notFoundMiddleware from "./middleware/not-found";

import authenticateUser from "./middleware/authentication";

// Routers
import authRouter from "./routes/auth";
import todosRouter from "./routes/todos";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todos", authenticateUser, todosRouter);

app.use(notFoundMiddleware);
app.use(notFoundMiddleware);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "./client/build"));
});

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, (): void => {
            console.log(`listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
