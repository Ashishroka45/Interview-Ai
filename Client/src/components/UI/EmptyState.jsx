import React from "react";
import "./ui.scss";

const EmptyState = ({
  icon = "📄",
  title = "No Items Yet",
  description = "Get started by creating your first item.",
  actionText = null,
  onAction = null,
}) => {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon-wrapper">
        <span className="empty-state-icon">{icon}</span>
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      
      {actionText && onAction && (
        <button type="button" className="empty-state-cta-btn" onClick={onAction}>
          <span className="cta-btn-plus">+</span>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
