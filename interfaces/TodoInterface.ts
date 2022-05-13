import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export interface TodoInterface extends mongoose.Document {
    name: string;
    description: string;
    completed: boolean;
    createdBy: ObjectId;
}
