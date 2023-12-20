import { createClient } from "redis";

const redisClient = createClient({
    url: "redis://redis_cache:6379",
}).on("error", (err) => console.log("Redis Client Error", err));

export default redisClient;
