import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message = 'An unexpected error occurred.', onRetry }) {
  return (
    <div className="state-container error-state" role="alert">
      <div className="error-icon-wrapper">
        <AlertTriangle className="error-icon" size={32} aria-hidden="true" />
      </div>
      <div className="state-text-wrapper">
        <h3 className="state-title">Something went wrong</h3>
        <p className="state-text">{message}</p>
      </div>
      {onRetry && (
        <button type="button" className="btn btn-retry" onClick={onRetry} aria-label="Retry loading content">
          <RefreshCw size={16} aria-hidden="true" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
