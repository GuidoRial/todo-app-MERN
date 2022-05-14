import { Request } from "express";

export interface GetUserInfoRequestInterface extends Request {
    user: { userId: string; name: string };
}
