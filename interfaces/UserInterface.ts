import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export interface UserInterface extends mongoose.Document {
    username: string;
    email: string;
    password: string;
}
