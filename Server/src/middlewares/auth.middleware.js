import jwt from "jsonwebtoken";
import blacklistModal from "../models/blacklist.model.js";
import AppError from "../utils/AppError.js";

export async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return next(new AppError("Access denied. Please log in.", 401, "UNAUTHORIZED"));
    }
    
    try {
        const isTokenBlackListed = await blacklistModal.findOne({ token: token });
        if (isTokenBlackListed) {
            return next(new AppError("Your session has expired. Please log in again.", 401, "SESSION_EXPIRED"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new AppError("Your session has expired. Please log in again.", 401, "SESSION_EXPIRED"));
        }
        return next(new AppError("Invalid session. Please log in again.", 401, "INVALID_TOKEN"));
    }
}