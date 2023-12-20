import rateLimit from "express-rate-limit";
import { ThrottlingError } from "../errors/ThrottlingError.js";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 1 hour
    max: 150, // limit each IP to 100 requests per windowMs
    handler: (req, res, next) => {
        next(
            new ThrottlingError(
                "Too many requests from this IP, please try again after an hour"
            )
        );
    },
});

export const sensitiveLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    handler: (req, res, next) => {
        next(new ThrottlingError("Too many attempts, please try again later"));
    },
});
