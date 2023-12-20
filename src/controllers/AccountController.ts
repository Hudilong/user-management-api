import { UserService } from "../services/UserService.js";

export class AccountController {
    constructor(private userService: UserService) {}

    async createAccount(req, res, next) {
        try {
            const newUser = await this.userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    }

    async getAccount(req, res, next) {
        //userId is passed from auth middleware
        const userId = req.user.userId;
        try {
            const user = await this.userService.getUserById(userId);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    async updateAccount(req, res, next) {
        //userId is passed from auth middleware
        const userId = req.user.userId;
        try {
            const user = await this.userService.updateUser(userId, req.body);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    async deleteAccount(req, res, next) {
        //userId is passed from auth middleware
        const userId = req.user.userId;
        try {
            await this.userService.deleteUser(userId);
            res.status(200).json({
                message: `User with ID: ${userId} deleted`,
            });
        } catch (err) {
            next(err);
        }
    }

    async uploadAvatar(req, res) {}
}
