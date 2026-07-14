import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
  generateResume,
} from "../../services/interview.api";
import { useParams } from "react-router";
import { useToast } from "../../../components/Toast/ToastContext";

export const useInterview = () => {
  const { interviewId } = useParams();
  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
    error,
    setError,
    pagination,
    setPagination,
  } = useContext(InterviewContext);
  
  const { showSuccess, showError } = useToast();

  const generateReport = async ({
    resume,
    jobDescription,
    selfDescription,
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await generateInterviewReport({
        resume,
        selfDescription,
        jobDescription,
      });
      setReport(res.interviewReport);
      showSuccess("Interview report generated successfully!");
      return res.interviewReport;
    } catch (err) {
      setError(err);
      showError(err.message || "Failed to generate interview report.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async ({ interviewId }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getInterviewReportById({ interviewId });
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (err) {
      setError(err);
      // We don't necessarily want a loud toast for loading an initial page
      // but we will let the Page UI handle displaying the error card
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReports = async ({page = 1, limit = 5} = {}) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await getAllInterviewReports({page, limit});
      setReports(resp?.reports || []);
      setPagination(resp?.pagination || null);
      console.log("haha",reports);
      
    } catch (err) {
      setError(err);
      showError("Failed to load recent interview plans.");
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = async ({ interviewId }) => {
    setLoading(true);
    try {
      const res = await generateResume({ interviewId });
      const url = window.URL.createObjectURL(
        new Blob([res], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccess("Resume PDF generated and downloaded successfully!");
    } catch (err) {
      showError(err.message || "Failed to generate and download resume PDF.");
    } finally {
      setLoading(false);
    }
  };
  useEffect (()=>{
    console.log("this called");
  
    getReports({page:1, limit:5});
  },[])

  useEffect(() => {
    if (interviewId) {
      getReportById({ interviewId });
    }
  }, [interviewId]);

  return {
    generateReport,
    getReportById,
    getReports,
    loading,
    setLoading,
    report,
    reports,
    error,
    setError,
    pagination,
    downloadResume,
  };
};
