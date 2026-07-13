import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { generateInterviewReportController,getInterviewReportById,getAllInterviewReports, generateReport } from "../controllers/interview.controller.js";
import upload from "../middlewares/file.middleware.js"
const interviewRoute = express.Router();

/**
 * @route POST /api/interview/
 * @description take the resume,job description and self description to generate interviewReport
 * @access PRIVATE
 */

interviewRoute.post("/",authMiddleware,upload.single("resume"),generateInterviewReportController)
interviewRoute.get("/report/:interviewId",authMiddleware,getInterviewReportById )
interviewRoute.get("/",authMiddleware,getAllInterviewReports )
interviewRoute.post("/generatepdf/:interviewId",authMiddleware,generateReport)


export default interviewRoute;