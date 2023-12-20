import { UserService } from "../services/UserService.js";

export class UserController {
    constructor(private userService: UserService) {}

    async getUsers(req, res, next) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }

    async createUser(req, res, next) {
        try {
            const newUser = await this.userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    }

    async getUser(req, res, next) {
        const { userId } = req.params;
        try {
            const user = await this.userService.getUserById(userId);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req, res, next) {
        const { userId } = req.params;
        try {
            const user = await this.userService.updateUser(userId, req.body);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req, res, next) {
        const { userId } = req.params;
        try {
            await this.userService.deleteUser(userId);
            res.status(200).json({
                message: `User with ID: ${userId} deleted`,
            });
        } catch (err) {
            next(err);
        }
    }
}
