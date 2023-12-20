import { UUID } from "crypto";
import { QueryResult } from "pg";
import { db } from "../config.js";
import { transformKeysToCamelCase } from "../../utils/snakeToCamel.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { DatabaseError } from "../../errors/DatabaseError.js";

type User = {
    id?: UUID;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    avatar?: string;
    role?: "admin" | "user";
};

class UserRepository {
    async getUserById(id: string): Promise<User> {
        try {
            const res: QueryResult = await db.query(
                `SELECT id, first_name, last_name, email, avatar, role
                 FROM users WHERE id = $1`,
                [id]
            );
            if (!res.rows.length) {
                throw new NotFoundError("User was not found");
            }
            return transformKeysToCamelCase(res.rows[0]) as User;
        } catch (err) {
            console.error(err);
            if (err instanceof NotFoundError) {
                throw err;
            }
            throw new Error();
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            const res: QueryResult = await db.query(
                `SELECT id, first_name, last_name, email, avatar, role
                 FROM users WHERE email = $1`,
                [email]
            );
            if (!res.rows.length) {
                throw new NotFoundError("User was not found");
            }
            return transformKeysToCamelCase(res.rows[0]) as User;
        } catch (err) {
            console.error(err);
            if (err instanceof NotFoundError) {
                throw err;
            }
            throw new Error();
        }
    }

    async getUserForLogin(email: string): Promise<User> {
        try {
            const res: QueryResult = await db.query(
                `SELECT id, first_name, last_name, email, password, avatar, role
                 FROM users WHERE email = $1`,
                [email]
            );
            if (!res.rows.length) {
                throw new NotFoundError("User was not found");
            }
            return transformKeysToCamelCase(res.rows[0]) as User;
        } catch (err) {
            console.error(err);
            if (err instanceof NotFoundError) {
                throw err;
            }
            throw new Error();
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const res: QueryResult = await db.query(
                `SELECT id, first_name, last_name, email, avatar, role
                 FROM users`
            );
            return transformKeysToCamelCase(res.rows) as User[];
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    async createUser(userData: User): Promise<User> {
        try {
            const { firstName, lastName, email, password, role } = userData;
            const res: QueryResult = await db.query(
                `INSERT INTO users (first_name, last_name, password, email, role)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING id, first_name, last_name, email, avatar, role`,
                [firstName, lastName, password, email, role]
            );
            return transformKeysToCamelCase(res.rows[0]) as User;
        } catch (err) {
            console.error(err);
            if (err.code === "23505") {
                throw new DatabaseError(409, "Email already in use");
            }
            throw new Error();
        }
    }

    async updateUser(userId: string, userData: User): Promise<User> {
        try {
            const { firstName, lastName, email, avatar, role } = userData;
            const res: QueryResult = await db.query(
                `UPDATE users
                 SET first_name = $1, last_name = $2, email = $3, avatar = $4, role = $5
                 WHERE id = $6
                 RETURNING id, first_name, last_name, email, avatar, role`,
                [firstName, lastName, email, avatar, role, userId]
            );

            if (!res.rows.length) {
                throw new NotFoundError("User was not found");
            }
            return transformKeysToCamelCase(res.rows[0]) as User;
        } catch (err) {
            console.error(err);
            if (err instanceof NotFoundError) {
                throw err;
            }
            throw new Error();
        }
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            const res: QueryResult = await db.query(
                `DELETE FROM users WHERE id = $1 RETURNING *;`,
                [id]
            );

            // If rows are returned, the deletion was successful
            if (res.rowCount === 0) throw new NotFoundError("User not found");
            return true;
        } catch (err) {
            console.error(err);
            if (err instanceof NotFoundError) {
                throw err;
            }
            throw new Error();
        }
    }

    // ... other methods related to user data ...
}

export { UserRepository, User };
