export const timeout = (seconds: number) => {
    return async (req, res, next) => {
        res.setTimeout(seconds * 1000, () => {
            console.log("Request has timed out.");
            res.status(408).json({ message: "Request timeout" });
        });
        next();
    };
};
