import { ForbiddenError } from "../errors/ForbiddenError.js";
import { UserRepository } from "../models/users/UserRepository.js";
import { UserService } from "../services/UserService.js";

type Role = "admin" | "user";
const userService = new UserService(new UserRepository());

export const authorize = (requiredRole: Role) => {
    return async (req, res, next) => {
        //userId is passed from auth middleware
        const userId = req.user;
        try {
            const user = await userService.getUserById(userId);
            if (user.role === requiredRole) {
                next();
            } else {
                throw new ForbiddenError("Access forbidden");
            }
        } catch (err) {
            console.error(err);
            next(err);
        }
    };
};
