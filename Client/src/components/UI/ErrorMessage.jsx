import React, { useState } from "react";
import "./ui.scss";

const ErrorMessage = ({
  title = "Something went wrong",
  message = "We couldn't process your request. Please try again in a few moments.",
  code = "UNKNOWN_ERROR",
  detail = null,
  isNetworkError = false,
  onRetry = null,
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const finalTitle = isNetworkError ? "You're Offline" : title;
  const finalMessage = isNetworkError
    ? "Please check your internet connection and try again."
    : message;

  return (
    <div className={`error-card-container ${isNetworkError ? "network-offline" : ""}`}>
      <div className="error-card-header">
        {isNetworkError ? (
          <span className="error-card-icon network-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
            </svg>
          </span>
        ) : (
          <span className="error-card-icon danger-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
        )}
        <h3>{finalTitle}</h3>
      </div>
      
      <div className="error-card-body">
        <p className="error-description">{finalMessage}</p>
        
        {detail && (
          <div className="error-tech-details">
            <button
              type="button"
              className="tech-details-toggle"
              onClick={() => setShowDetail(!showDetail)}
            >
              {showDetail ? "Hide technical details" : "Show technical details"}
            </button>
            
            {showDetail && (
              <div className="tech-details-pane">
                <p><strong>Code:</strong> {code}</p>
                {typeof detail === "string" ? (
                  <pre className="tech-details-raw">{detail}</pre>
                ) : (
                  <pre className="tech-details-raw">{JSON.stringify(detail, null, 2)}</pre>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {onRetry && (
        <div className="error-card-actions">
          <button type="button" className="retry-btn" onClick={onRetry}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
