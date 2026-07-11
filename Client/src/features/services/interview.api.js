import axios from "axios";

const baseUrl = "http://localhost:8000/api/interview";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);
    const response = await api.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllInterviewReports() {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function getInterviewReportById({interviewId}) {
  try {
        console.log("API function ID:", interviewId);
    const response = await api.get(`/report/${interviewId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
