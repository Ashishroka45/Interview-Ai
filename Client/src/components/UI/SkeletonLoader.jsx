import React from "react";
import "./ui.scss";

export const SkeletonLine = ({ width = "100%", height = "16px", marginBottom = "8px" }) => {
  return (
    <div
      className="skeleton-pulse skeleton-text-line"
      style={{ width, height, marginBottom }}
    />
  );
};

export const ReportCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card-header">
        <div className="skeleton-pulse skeleton-title-block"></div>
        <div className="skeleton-pulse skeleton-badge-block"></div>
      </div>
      <div className="skeleton-card-body">
        <SkeletonLine width="60%" height="12px" />
      </div>
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="skeleton-dashboard-wrapper">
      {/* Left nav block */}
      <aside className="skeleton-sidebar">
        <div className="skeleton-pulse skeleton-sidebar-header"></div>
        <div className="skeleton-pulse skeleton-sidebar-circle"></div>
        <div className="skeleton-sidebar-nav">
          <div className="skeleton-pulse skeleton-nav-item"></div>
          <div className="skeleton-pulse skeleton-nav-item"></div>
          <div className="skeleton-pulse skeleton-nav-item"></div>
        </div>
      </aside>

      {/* Main middle content block */}
      <section className="skeleton-main">
        <div className="skeleton-pulse skeleton-main-title"></div>
        <div className="skeleton-questions">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-question-item">
              <div className="skeleton-pulse skeleton-number-badge"></div>
              <div className="skeleton-q-body">
                <SkeletonLine width="80%" height="18px" marginBottom="14px" />
                <SkeletonLine width="95%" height="14px" />
                <SkeletonLine width="90%" height="14px" marginBottom="20px" />
                <SkeletonLine width="92%" height="14px" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Right side block */}
      <aside className="skeleton-sidebar-right">
        <div className="skeleton-pulse skeleton-right-header"></div>
        <div className="skeleton-skills">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="skeleton-pulse skeleton-skill-chip"></div>
          ))}
        </div>
        <div className="skeleton-pulse skeleton-right-card"></div>
      </aside>
    </div>
  );
};

const SkeletonLoader = ({ type = "card", count = 1 }) => {
  if (type === "dashboard") {
    return <DashboardSkeleton />;
  }

  const items = Array.from({ length: count }, (_, idx) => idx);

  return (
    <div className="skeleton-list">
      {items.map((i) => (
        <React.Fragment key={i}>
          {type === "card" ? <ReportCardSkeleton /> : <SkeletonLine />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SkeletonLoader;
