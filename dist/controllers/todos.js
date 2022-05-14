"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodo = exports.createTodo = exports.getAllTodos = void 0;
var Todo_1 = __importDefault(require("../models/Todo"));
var http_status_codes_1 = require("http-status-codes");
var errors_1 = require("../errors/");
var getAllTodos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Todo_1.default.find({ createdBy: req.user.userId }).sort("createdAt")];
            case 1:
                todos = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json(todos);
                return [2 /*return*/];
        }
    });
}); };
exports.getAllTodos = getAllTodos;
var createTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req.body.createdBy = req.user.userId;
                return [4 /*yield*/, Todo_1.default.create(req.body)];
            case 1:
                todo = _a.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).json({ todo: todo });
                return [2 /*return*/];
        }
    });
}); };
exports.createTodo = createTodo;
var getTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, todoId, todo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.userId, todoId = req.params.id;
                return [4 /*yield*/, Todo_1.default.findOne({ _id: todoId, createdBy: userId })];
            case 1:
                todo = _a.sent();
                if (!todo) {
                    throw new errors_1.NotFoundError("No todo with id ".concat(todoId));
                }
                res.status(http_status_codes_1.StatusCodes.OK).json(todo);
                return [2 /*return*/];
        }
    });
}); };
exports.getTodo = getTodo;
var deleteTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, todoId, todo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.userId, todoId = req.params.id;
                return [4 /*yield*/, Todo_1.default.findOneAndRemove({
                        _id: todoId,
                        createdBy: userId,
                    })];
            case 1:
                todo = _a.sent();
                if (!todo) {
                    throw new errors_1.NotFoundError("No todo with id ".concat(todoId));
                }
                res.status(http_status_codes_1.StatusCodes.OK).json(todo);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteTodo = deleteTodo;
var updateTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, userId, todoId, todo;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description, userId = req.user.userId, todoId = req.params.id;
                if (name === "" || description === "") {
                    throw new errors_1.BadRequestError("Name or description can't be empty");
                }
                return [4 /*yield*/, Todo_1.default.findByIdAndUpdate({ _id: todoId, createdBy: userId }, req.body, { new: true, runValidators: true })];
            case 1:
                todo = _b.sent();
                if (!todo) {
                    throw new errors_1.NotFoundError("No todo with id ".concat(todoId));
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({ todo: todo });
                return [2 /*return*/];
        }
    });
}); };
exports.updateTodo = updateTodo;
