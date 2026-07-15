import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import interviewRoute from "./routes/interview.route.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import AppError from "./utils/AppError.js";

const app = express();

app.use(cors({
    origin:"https://interview-ai-dfa2.vercel.app",
    credentials:true
}));
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRoute);

app.all(/.*/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404, "ROUTE_NOT_FOUND"));
});

app.use(globalErrorHandler);

export default app;