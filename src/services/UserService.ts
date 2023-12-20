import { UserRepository, User } from "../models/users/UserRepository.js";
import bcrypt from "bcrypt";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getUserById(id: string): Promise<User> {
        try {
            return this.userRepository.getUserById(id);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            return this.userRepository.getUserByEmail(email);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return this.userRepository.getAllUsers();
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async createUser(userData: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        try {
            return await this.userRepository.createUser({
                ...userData,
                password: hashedPassword,
                role: userData.role ? userData.role : "user",
            });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateUser(userId: string, userData: User): Promise<User> {
        try {
            return await this.userRepository.updateUser(userId, userData);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async deleteUser(userId: string): Promise<boolean> {
        try {
            return await this.userRepository.deleteUser(userId);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // ... other business logic methods ...
}
