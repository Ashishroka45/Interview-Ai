import { useState } from "react";
import { createContext } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [pagination,setPagination] = useState(null)

  return (
    <InterviewContext.Provider
      value={{
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports,
        error,
        setError,
        pagination,
        setPagination
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
