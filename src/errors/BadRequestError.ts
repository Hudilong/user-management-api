export class BadRequestError extends Error {
    status: number = 400;
    constructor(message = "Bad Request") {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
