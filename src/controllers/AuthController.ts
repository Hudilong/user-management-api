import { AuthService } from "../services/AuthService.js";

export class AuthController {
    constructor(private authService: AuthService) {}

    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await this.authService.loginUser({ email, password });
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        const refreshToken = req.body.token;
        try {
            await this.authService.logoutUser(refreshToken);
            res.status(200).json({ message: "Successfuly logged out." });
        } catch (err) {
            next(err);
        }
    }

    async refresh(req, res, next) {
        const refreshToken = req.body.token;
        try {
            const { newToken, newRefreshToken } =
                await this.authService.refreshToken(refreshToken);
            res.status(200).json({
                token: newToken,
                refreshToken: newRefreshToken,
            });
        } catch (err) {
            next(err);
        }
    }
}
