import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { AuthenticationError } from "../errors/AuthenticationError.js";

const { verify } = jwt;

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export const authenticate = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return next(new AuthenticationError("Not authenticated"));
    }

    verify(
        token,
        JWT_ACCESS_SECRET,
        (err: JsonWebTokenError, decodedToken: JwtPayload) => {
            if (err) {
                return next(
                    new AuthenticationError("Invalid or expired token")
                );
            }

            //send the verified userId
            req.user = decodedToken.userId;
            next();
        }
    );
};
