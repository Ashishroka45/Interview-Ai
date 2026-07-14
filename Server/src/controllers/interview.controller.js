import { PDFParse } from "pdf-parse";
import {
  generateInterviewReport,
  generateResume,
} from "../services/ai.service.js";
import InterviewReportModel from "../models/interviewReport.model.js";
import AppError from "../utils/AppError.js";
import errorHandler from "../middlewares/errorhandler.js";

export const generateInterviewReportController = errorHandler(
  async (req, res) => {
    if (!req.file) {
      throw new AppError("Please upload a resume.", 400, "RESUME_REQUIRED");
    }

    const parser = new PDFParse({
      data: new Uint8Array(req.file.buffer),
    });

    let resumeContent;

    try {
      const result = await parser.getText();
      resumeContent = result.text;
    } catch (parseError) {
      throw new AppError(
        "Failed to parse PDF resume content.",
        400,
        "PDF_PARSE_FAILED",
      );
    } finally {
      await parser.destroy();
    }

    const { selfDescription, jobDescription } = req.body;

    if (!jobDescription) {
      throw new AppError(
        "Job description is required.",
        400,
        "VALIDATION_ERROR",
      );
    }
    if (!selfDescription && !resumeContent) {
      throw new AppError(
        "Either a resume or a self description is required.",
        400,
        "VALIDATION_ERROR",
      );
    }

    let interviewReportByAi;
    try {
      interviewReportByAi = await generateInterviewReport({
        resume: resumeContent || "",
        jobDescription,
        selfDescription: selfDescription || "",
      });
    } catch (aiError) {
      throw new AppError(
        `AI API Generation failed: ${aiError.message}`,
        502,
        "AI_SERVICE_ERROR",
      );
    }

    const interviewReport = await InterviewReportModel.create({
      user: req.user.id,
      resume: resumeContent || "",
      selfDescription: selfDescription || "",
      jobDescription,
      ...interviewReportByAi,
    });

    return res.status(201).json({
      success: true,
      message: "Interview report generated successfully.",
      interviewReport,
    });
  },
);

export const getInterviewReportById = errorHandler(async (req, res) => {
  const { interviewId } = req.params;
  const interviewReport = await InterviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    throw new AppError("Interview report not found", 404, "REPORT_NOT_FOUND");
  }

  return res.status(200).json({
    success: true,
    message: "Interview report fetched successfully",
    interviewReport,
  });
});

export const getAllInterviewReports = errorHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 5);

  const skip = (page - 1) * limit;

  const reports = await InterviewReportModel.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGap -preparationPlan",
    );
  const totalReports = await InterviewReportModel.countDocuments({
    user: req.user.id,
  });
  const totalPages = Math.ceil(totalReports / limit);
  return res.status(200).json({
    success: true,
    message: "Interview reports fetched successfully",
    reports,
    pagination: {
      totalPages,
      currentPage: page,
      totalReports,
         hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    },
  });
});

export const generateReport = errorHandler(async (req, res) => {
  const { interviewId } = req.params;
  const interviewReport = await InterviewReportModel.findById(interviewId);

  if (!interviewReport) {
    throw new AppError("Interview report not found", 404, "REPORT_NOT_FOUND");
  }

  const { resume, jobDescription, selfDescription } = interviewReport;

  let pdfBuffer;
  try {
    pdfBuffer = await generateResume({
      resume,
      jobDescription,
      selfDescription,
    });
  } catch (pdfError) {
    throw new AppError(
      `Failed to generate resume PDF: ${pdfError.message}`,
      502,
      "PDF_GENERATION_FAILED",
    );
  }

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`,
  });

  return res.send(pdfBuffer);
});
