import jwt, { JwtPayload } from "jsonwebtoken";
import redisClient from "../redisClient.js";

const { verify, sign, decode } = jwt;

export class AuthRepository {
    constructor(private accessSecret: string, private refreshSecret: string) {}

    generateAccessToken(userId: string) {
        return sign({ userId }, this.accessSecret, {
            expiresIn: "15m",
        });
    }

    generateRefreshToken(userId: string) {
        return sign({ userId }, this.refreshSecret, {
            expiresIn: "30 days",
        });
    }

    async blacklistToken(token: string) {
        try {
            const decodedToken = decode(token, { complete: true })
                .payload as JwtPayload;
            if (!decodedToken) {
                throw new Error();
            }
            const currentTime = Math.floor(Date.now() / 1000);
            const timeLeft = decodedToken.exp - currentTime;
            await redisClient.connect();
            await redisClient.set(`token: ${token}`, 1, { EX: timeLeft });
            await redisClient.quit();
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    async checkIfTokenIsBlacklisted(token: string) {
        try {
            await redisClient.connect();
            const exists = await redisClient.exists(`token: ${token}`);
            await redisClient.quit();
            return exists === 1;
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    async verifyAccessToken(token: string) {
        try {
            const decoded = verify(token, this.accessSecret) as JwtPayload;
            return decoded.userId as string;
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }

    async verifyRefreshToken(token: string) {
        try {
            const decoded = verify(token, this.refreshSecret) as JwtPayload;
            return decoded.userId as string;
        } catch (err) {
            console.error(err);
            throw new Error();
        }
    }
}
