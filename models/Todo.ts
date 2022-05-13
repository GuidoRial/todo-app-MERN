import { Schema, model, Types } from "mongoose";
import { TodoInterface } from "../interfaces/TodoInterface";

const TodoSchema = new Schema<TodoInterface>(
    {
        name: {
            type: String,
            required: [true, "A name must be provided"],
            trim: true,
            maxlength: [40, "The name cannot be more than 40 characters"],
        },
        description: {
            type: String,
            required: [true, "A description must be provided"],
            trim: true,
            maxlength: [
                50,
                "The description cannot be more than 20 characters",
            ],
        },
        completed: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: Types.ObjectId,
            ref: "User",
            // Tie todo to user
            required: [true, "Please provide user"],
        },
    },
    { timestamps: true } //
);

module.exports = model("Todo", TodoSchema);
