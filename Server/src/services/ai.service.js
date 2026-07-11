import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });
// console.log("GEMINI_API_KEY:",process.env.GEMINI_API_KEY);
// console.log("PORT",process.env.PORT);
const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Overall compatibility score between the candidate and the job description.",
    ),
    title:z.string().describe("The title for the job which the interview report is generated."),
  technicalQuestions: z
    .array(
      z.object({
        question: z.string().describe("A technical interview question."),

        answer: z
          .string()
          .describe(
            "An ideal answer explaining the concept, important points, and best practices.",
          ),

        intention: z
          .string()
          .describe(
            "Why the interviewer asks this question and what they want to evaluate.",
          ),
      }),
    )
    .describe("List of technical interview questions."),

  behaviouralQuestions: z
    .array(
      z.object({
        question: z.string().describe("A behavioral interview question."),

        answer: z
          .string()
          .describe("An ideal STAR-based answer with practical examples."),

        intention: z
          .string()
          .describe(
            "The competency or behavior the interviewer is evaluating.",
          ),
      }),
    )
    .describe("List of behavioral interview questions."),

  skillGap: z
    .array(
      z.object({
        skill: z.string().describe("A missing or weak skill."),

        severity: z
          .enum(["low", "medium", "high"])
          .describe("Importance of improving this skill."),
      }),
    )
    .describe("Skills the candidate should improve."),

  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("Day number of the preparation schedule."),

        focus: z.string().describe("Main learning objective for the day."),

        task: z
          .array(z.string().describe("A topic to study."))
          .describe("Tasks to cover during the day."),
      }),
    )
    .describe("A day-by-day interview preparation plan."),
});

export async function generateInterviewReport({
  resume,
  jobDescription,
  selfDescription,
}) {
  //   console.log("PORT:", process.env.PORT);
  // console.log("KEY:", process.env.GEMINI_API_KEY);

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const prompt = `Generate an interview report based on the following resume and job description. 
    Resume: ${resume}
    Job Description: ${jobDescription}
    Self Description: ${selfDescription}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(interviewReportSchema),
    },
  });
  const report = interviewReportSchema.parse(JSON.parse(response.text));

return report;
}
