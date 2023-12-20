export class TokenError extends Error {
    status: number = 403;
    constructor(message = "Invalid or expired token") {
        super(message);
        Object.setPrototypeOf(this, TokenError.prototype);
    }
}
