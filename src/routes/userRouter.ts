import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { UserService } from "../services/UserService.js";
import { UserRepository } from "../models/users/UserRepository.js";
import { UserController } from "../controllers/UserController.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

const userController = new UserController(
    new UserService(new UserRepository())
);

// List all users
router.get("/", authenticate, (req, res, next) =>
    userController.getUsers(req, res, next)
);

// Get a specific user by ID
router.get("/:userId", authenticate, (req, res, next) =>
    userController.getUser(req, res, next)
);

// Create a new user
router.post("/", authenticate, authorize("admin"), (req, res, next) =>
    userController.createUser(req, res, next)
);

// Update a user by ID
router.put("/:userId", authenticate, authorize("admin"), (req, res, next) =>
    userController.updateUser(req, res, next)
);

// Delete a user by ID
router.delete("/:userId", authenticate, authorize("admin"), (req, res, next) =>
    userController.deleteUser(req, res, next)
);

export default router;
