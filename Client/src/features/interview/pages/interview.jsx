import { useState, useEffect } from "react";
import "../style/interview.scss";

import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router";





/* ── Severity helpers ─────────────────────── */
const severityLabel = { high: "High", medium: "Medium", low: "Low" };

const severityIcon = {
  high: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  medium: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  low: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

/* ── Nav items ────────────────────────────── */
const NAV_ITEMS = [
  { key: "technical", label: "Technical Questions", icon: "💻" },
  { key: "behavioural", label: "Behavioural Questions", icon: "🗣️" },
  { key: "roadmap", label: "RoadMap", icon: "🗺️" },
];

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */
export function Interview() {
  const [activeSection, setActiveSection] = useState("technical");
  const {report,loading,downloadResume} = useInterview()
  const {interviewId} = useParams();
  // console.log("Report1",report?.technicalQuestions);

  if(loading || !report){
    return (
      <div className="Home">
        <h1>Loading...</h1>
      </div>
    )
  }
  // console.log("Report",report);
  const handleDownloadResume=()=>{
    downloadResume({interviewId})
  }
  /* ── Render helpers ─────────────────────── */
  const renderTechnicalQuestions = () => (
    <div className="section-content">
      <div className="section-header">
        <h2>Technical Questions</h2>
        <span className="question-count">{report.technicalQuestions.length} Questions</span>
      </div>
      <div className="questions-list">
        {report.technicalQuestions.map((q, i) => (
          <div className="question-card" key={i}>
            <div className="question-number">Q{i + 1}</div>
            <div className="question-body">
              <h4 className="question-text">{q.question}</h4>
              <div className="answer-block">
                <span className="answer-label">Suggested Answer</span>
                <p>{q.answer}</p>
              </div>
              <div className="intention-block">
                <span className="intention-label">Intention</span>
                <p>{q.intention}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBehaviouralQuestions = () => (
    <div className="section-content">
      <div className="section-header">
        <h2>Behavioural Questions</h2>
        <span className="question-count">{report.behaviouralQuestions.length} Questions</span>
      </div>
      <div className="questions-list">
        {report.behaviouralQuestions.map((q, i) => (
          <div className="question-card" key={i}>
            <div className="question-number">Q{i + 1}</div>
            <div className="question-body">
              <h4 className="question-text">{q.question}</h4>
              <div className="answer-block">
                <span className="answer-label">Suggested Answer</span>
                <p>{q.answer}</p>
              </div>
              <div className="intention-block">
                <span className="intention-label">Intention</span>
                <p>{q.intention}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRoadmap = () => (
    <div className="section-content">
      <div className="section-header">
        <h2>Preparation Roadmap</h2>
        <span className="question-count">{report.preparationPlan.length}-Day Plan</span>
      </div>
      <div className="roadmap-list">
        {report.preparationPlan.map((day, i) => (
          <div className="roadmap-card" key={i}>
            <div className="day-badge">Day {day.day}</div>
            <div className="roadmap-body">
              <h4 className="roadmap-focus">{day.focus}</h4>
              <ul className="task-list">
                {day.task.map((t, j) => (
                  <li key={j}>
                    <span className="task-bullet">▸</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activeSection) {
      case "technical":
        return renderTechnicalQuestions();
      case "behavioural":
        return renderBehaviouralQuestions();
      case "roadmap":
        return renderRoadmap();
      default:
        return renderTechnicalQuestions();
    }
  };


  /* ── JSX ────────────────────────────────── */
  return (
    
    <main className="InterviewReport">
      {/* ── LEFT SIDEBAR ── */}
      <aside className="sidebar-left">
        <div className="sidebar-brand">
          <span className="brand-icon">✦</span>
          <span className="brand-text">Interview AI</span>
        </div>

        {/* Match Score */}
        <div className="match-score-card">
          <span className="score-label">Match Score</span>
          <div className="score-ring">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle-fill"
                strokeDasharray={`${report.matchScore}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="score-value">{report.matchScore}%</span>
          </div>
        </div>
          
        {/* Navigation */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeSection === item.key ? "active" : ""}`}
              onClick={() => setActiveSection(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
          
            <button className="button" onClick={handleDownloadResume}>
              
            <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
             Generate Resume
              </button>
        
        </nav>

        <div className="sidebar-footer">
          <p>Powered by AI</p>
        </div>
      </aside>

      {/* ── CENTER MAIN CONTENT ── */}
      <section className="main-content">{renderMainContent()}</section>

      {/* ── RIGHT SIDEBAR ── */}
      <aside className="sidebar-right">
        <div className="skills-gap-header">
          <h3>Skills Gap</h3>
          <span className="skills-count">{report.skillGap.length}</span>
        </div>

        <div className="skills-list">
          {report.skillGap.map((s, i) => (
            <div className={`skill-chip severity-${s.severity}`} key={i}>
              <span className="skill-icon">{severityIcon[s.severity]}</span>
              <span className="skill-name">{s.skill}</span>
              <span className={`severity-badge ${s.severity}`}>
                {severityLabel[s.severity]}
              </span>
            </div>
          ))}
        </div>

        {/* Job Description Summary */}
        <div className="job-summary-card">
          <h4>Job Description</h4>
          <p>{report.jobDescription}</p>
        </div>
      </aside>
    </main>
  );
}
