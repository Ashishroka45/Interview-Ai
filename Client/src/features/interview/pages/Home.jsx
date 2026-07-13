import { useState, useRef, useEffect } from "react";
import "../style/home.scss";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
export function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const fileInputRef = useRef(null);
  const maxChars = 5000;
  const { loading, generateReport, reports,getReports } = useInterview();
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  useEffect(()=>{
    getReports()
  },[])

  const generateInterviewReport = async () => {
    console.log("Button clicked");

    const resume = fileInputRef.current.files[0];
    if (!jobDescription || !selfDescription || !resume) {
      alert("Please fill all the fields");
      return;
    }
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resume,
    });
    console.log("data", data);
    navigate(`/interview/${data?._id}`);
  };
       console.log("Reports", reports);

  return (
    <main className="Home">
      {/* Hero Section */}
      <section className="hero">
        <h1>
          Create Your Custom{" "}
          <span className="gradient-text">Interview Plan</span>
        </h1>
        <p className="subtitle">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </section>

      {/* Card Container */}
      <div className="card-container">
        <div className="form-content">
          {/* Left Column — Job Description */}
          <div className="form-column left-column">
            <div className="column-header">
              <span className="icon-container required-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              <h3>Target Job Description</h3>
              <span className="badge required">REQUIRED</span>
            </div>

            <div className="textarea-wrapper">
              <textarea
                name="jobDescription"
                id="jobDescription"
                placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                value={jobDescription}
                onChange={(e) => {
                  if (e.target.value.length <= maxChars) {
                    setJobDescription(e.target.value);
                  }
                }}
              />
              <div className="char-counter">
                {jobDescription.length} / {maxChars} chars
              </div>
            </div>
          </div>

          {/* Right Column — Profile */}
          <div className="form-column right-column">
            <div className="column-header">
              <span className="icon-container profile-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <h3>Your Profile</h3>
            </div>

            {/* Resume Upload */}
            <div className="input-group">
              <div className="label-row">
                <label>Upload Resume</label>
                <span className="badge best-results">BEST RESULTS</span>
              </div>

              <div
                className="file-drop-zone"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {resumeFile ? (
                  <div className="file-selected">
                    <span className="file-icon">📄</span>
                    <span className="file-name">{resumeFile.name}</span>
                  </div>
                ) : (
                  <>
                    <span className="upload-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </span>
                    <p className="drop-text">
                      Click to upload or drag &amp; drop
                    </p>
                    <p className="drop-hint">PDF or DOCX (Max 5MB)</p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                name="resume"
                id="resume"
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />
            </div>

            <div className="divider-row">
              <span className="divider-line" />
              <span className="divider-text">OR</span>
              <span className="divider-line" />
            </div>

            {/* Self Description */}
            <div className="input-group self-desc-group">
              <label htmlFor="selfDescription">Quick Self-Description</label>
              <textarea
                name="selfDescription"
                id="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
              />
            </div>

            {/* Info Note */}
            <div className="info-note">
              <span className="info-dot">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </span>
              <p>
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required to generate a
                personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="card-footer">
          <span className="footer-meta">
            AI-Powered Strategy Generation • Approx 30s
          </span>
          <button
            className="cta-button"
            onClick={generateInterviewReport}
            disabled={loading}
          >
            <span className="cta-star">★</span>
            {loading ? "Generating..." : "Generate My Interview Strategy"}
          </button>
        </div>
      </div>
      <div className="footer">
        <div className="container">
          <h2>My recent interview plans</h2>
          {reports.map((report) => {
       
            return (
              <div className="report"
              key={report._id}
              onClick={()=>{navigate(`/interview/${report._id}`)}}
              >
                <div className="report-header">
                  <h3>{report.title || "United Position"}</h3>
                  <p>
                    Generated on{" "}
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                  <p
                    className={
                      report.matchScore >= 80 ? "score-high" : "score-low"
                    }
                  >{`Match Score ${report.matchScore}`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Footer Links */}
      <footer className="page-footer">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#help">Help Center</a>
      </footer>
    </main>
  );
}
