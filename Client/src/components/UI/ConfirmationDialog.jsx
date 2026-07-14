import React from "react";
import "./ui.scss";

const ConfirmationDialog = ({
  isOpen = false,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-card">
        <div className="dialog-header">
          <h3>{title}</h3>
        </div>
        <div className="dialog-body">
          <p>{message}</p>
        </div>
        <div className="dialog-actions">
          <button type="button" className="dialog-btn cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>
          <button
            type="button"
            className={`dialog-btn confirm-btn ${isDestructive ? "destructive" : ""}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
