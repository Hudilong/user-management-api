export class DatabaseError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
}
