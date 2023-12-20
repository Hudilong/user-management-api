import express from "express";
import { UserRepository } from "../models/users/UserRepository.js";
import { authenticate } from "../middlewares/authenticate.js";
import { UserService } from "../services/UserService.js";
import { AccountController } from "../controllers/AccountController.js";

const router = express.Router();

const accountController = new AccountController(
    new UserService(new UserRepository())
);

//Create account
router.post("/", (req, res, next) =>
    accountController.createAccount(req, res, next)
);

//Get account info
router.get("/", authenticate, (req, res, next) =>
    accountController.getAccount(req, res, next)
);

//Update account
router.put("/", authenticate, (req, res, next) =>
    accountController.updateAccount(req, res, next)
);

//Delete account
router.delete("/", authenticate, (req, res, next) =>
    accountController.deleteAccount(req, res, next)
);

//Upload profile picture
router.post("/upload", authenticate, (req, res, next) =>
    accountController.uploadAvatar(req, res)
);

export default router;
