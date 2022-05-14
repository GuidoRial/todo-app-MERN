import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api-error";

class UnauthorizedError extends CustomAPIError {
    statusCode: StatusCodes;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default UnauthorizedError;
