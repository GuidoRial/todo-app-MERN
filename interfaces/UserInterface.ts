import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    createJWT: () => string;
    comparePassword: (password: string) => boolean;
}
