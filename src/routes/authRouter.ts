import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { UserRepository } from "../models/users/UserRepository.js";
import { AuthService } from "../services/AuthService.js";
import { AuthRepository } from "../models/authentication/AuthRepository.js";
import { AuthController } from "../controllers/AuthController.js";

const router = express.Router();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const authController = new AuthController(
    new AuthService(
        new AuthRepository(JWT_ACCESS_SECRET, JWT_REFRESH_SECRET),
        new UserRepository()
    )
);

router.post("/login", (req, res, next) => authController.login(req, res, next));
router.post("/logout", authenticate, (req, res, next) =>
    authController.logout(req, res, next)
);
router.post("/refresh", (req, res, next) =>
    authController.refresh(req, res, next)
);

export default router;
