import { useState, useEffect } from "react";
import "../style/interview.scss";

import { useInterview } from "../hooks/useInterview";





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
  const {report,loading} = useInterview()
  
  // console.log("Report1",report?.technicalQuestions);

  if(loading || !report){
    return (
      <div className="Home">
        <h1>Loading...</h1>
      </div>
    )
  }
  // console.log("Report",report);
  
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
