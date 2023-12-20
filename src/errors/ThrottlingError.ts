export class ThrottlingError extends Error {
    status: number = 429;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ThrottlingError.prototype);
    }
}
