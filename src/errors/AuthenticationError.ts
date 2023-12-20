export class AuthenticationError extends Error {
    status: number = 401;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}
