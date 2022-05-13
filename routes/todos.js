"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var todos_1 = require("../controllers/todos");
router.route("/").get(todos_1.getAllTodos).post(todos_1.createTodo);
router.route("/:id").get(todos_1.getTodo).patch(todos_1.updateTodo).delete(todos_1.deleteTodo);
module.exports = router;
