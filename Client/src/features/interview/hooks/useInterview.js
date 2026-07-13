import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
  generateResume,
} from "../../services/interview.api";
import { useParams } from "react-router";

export const useInterview = () => {
  const { interviewId } = useParams();
  const { loading, setLoading, report, setReport, reports, setReports } =
    useContext(InterviewContext);

  const generateReport = async ({
    resume,
    jobDescription,
    selfDescription,
  }) => {
    setLoading(true);
    try {
      const res = await generateInterviewReport({
        resume,
        selfDescription,
        jobDescription,
      });
      setReport(res.interviewReport);
      // console.log("Respose",res);

      return res.interviewReport;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async ({ interviewId }) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById({ interviewId });
      //  console.log("Interview ID inside hook:", interviewId);
      // console.log("Response",response);

      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    try {
      const resp = await getAllInterviewReports();

      setReports(resp.report);
      console.log("Data from api", resp);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = async ({ interviewId }) => {
    setLoading(true);
    try {
      const res = await generateResume({ interviewId });
      console.log("Response", res);
      const url = window.URL.createObjectURL(
        new Blob([res], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
    downloadResume,
  };
};
