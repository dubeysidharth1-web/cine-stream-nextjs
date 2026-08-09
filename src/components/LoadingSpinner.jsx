import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading content...' }) {
  return (
    <div className="state-container loading-state" role="status" aria-live="polite">
      <Loader2 className="spinner-icon" size={36} aria-hidden="true" />
      <p className="state-text">{message}</p>
    </div>
  );
}
