import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import interviewRoute from "./routes/interview.route.js";


const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRoute);

export default app;