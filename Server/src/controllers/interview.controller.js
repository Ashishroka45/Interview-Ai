import { PDFParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.service.js";
import InterviewReportModel from "../models/interviewReport.model.js";

export async function generateInterviewReportController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume.",
      });
    }

    const parser = new PDFParse({
      data: new Uint8Array(req.file.buffer),
    });

    let resumeContent;

    try {
      const result = await parser.getText();
      resumeContent = result.text
    } finally {
      await parser.destroy();
    }

    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent,
      jobDescription,
      selfDescription,
    });

    const interviewReport = await InterviewReportModel.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    return res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport,
    });
    // console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getInterviewReportById(req,res){
  try {
    const {interviewId} = req.params;
    const interviewReport = await InterviewReportModel.findOne({_id: interviewId, user: req.user.id})
    if (!interviewReport){
 return res.status(404).json({
  message:"Interview report not found"
 })     
    }
    res.status(200).json({
      message:"Interview report fetched successfully",
      interviewReport
    })

  } catch (error) {
    console.log(error.message);
    
  }
}

export async function getAllInterviewReports (req,res){
  try {
    const report = await InterviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -_v -technicalQuestions -behaviouralQuestions -skillGap -preparationPlan")
    return res.status(200).json({
      message:"Interview reports fetched successfully",
      report
    })
  } catch (error) {
    console.log(error.message)
  }
}