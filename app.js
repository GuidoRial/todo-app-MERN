require("dotenv").config();
require("express-async-errors");

const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./database/connect");
const User = require("./models/User");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

const authenticateUser = require("./middleware/authentication");

// Routers
const authRouter = require("./routes/auth");
const todosRouter = require("./routes/todos");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todos", authenticateUser, todosRouter);

app.use(notFoundMiddleware);
app.use(notFoundMiddleware);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build"));
});

/*
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
*/
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
