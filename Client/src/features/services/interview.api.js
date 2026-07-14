import apiClient from "./apiClient";

export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const formData = new FormData();
  if (resume) formData.append("resume", resume);
  formData.append("selfDescription", selfDescription || "");
  formData.append("jobDescription", jobDescription || "");
  
  const response = await apiClient.post("/interview/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function getAllInterviewReports({page = 1, limit = 5}) {
  const response = await apiClient.get(`/interview/reports?page=${page}&limit=${limit}`);
  // console.log("Response in api ",response.data);
  return response.data; 
}

export async function getInterviewReportById({ interviewId }) {
  const response = await apiClient.get(`/interview/report/${interviewId}`);
  return response.data;
}

export async function generateResume({ interviewId }) {
  const response = await apiClient.post(`/interview/generatepdf/${interviewId}`, null, {
    responseType: "blob",
  });
  return response.data;
}
