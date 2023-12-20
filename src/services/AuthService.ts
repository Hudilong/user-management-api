import { User, UserRepository } from "../models/users/UserRepository.js";
import { AuthRepository } from "../models/authentication/AuthRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../errors/AuthenticationError.js";

export class AuthService {
    constructor(
        private authRepository: AuthRepository,
        private userRepository: UserRepository
    ) {}

    async refreshToken(token: string) {
        try {
            const blacklisted =
                this.authRepository.checkIfTokenIsBlacklisted(token);
            if (blacklisted) {
                throw new AuthenticationError("Invalid Refresh Token");
            }
            const userId = await this.authRepository.verifyRefreshToken(token);
            return {
                newToken: this.authRepository.generateAccessToken(userId),
                newRefreshToken:
                    this.authRepository.generateRefreshToken(userId),
            };
        } catch (err) {
            if (err instanceof AuthenticationError) {
                throw err;
            }
            throw new Error();
        }
    }

    async logoutUser(token: string) {
        try {
            await this.authRepository.blacklistToken(token);
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    async loginUser(loginData: {
        email: string;
        password: string;
    }): Promise<{ user: User; token: string; refreshToken: string }> {
        const { email, password } = loginData;
        try {
            const user = await this.userRepository.getUserForLogin(email);
            if (!(await bcrypt.compare(password, user.password))) {
                throw new AuthenticationError("Invalid credentials.");
            }
            const token = this.authRepository.generateAccessToken(user.id);
            const refreshToken = this.authRepository.generateRefreshToken(
                user.id
            );

            //DO NOT RETURN THE PASSWORD
            return {
                user: {
                    ...user,
                    password: undefined,
                },
                token,
                refreshToken,
            };
        } catch (err) {
            if (err instanceof AuthenticationError) {
                throw err;
            }
            throw new Error();
        }
    }
}
