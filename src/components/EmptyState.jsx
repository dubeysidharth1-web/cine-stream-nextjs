import React from 'react';
import { Film } from 'lucide-react';

export default function EmptyState({
  title = 'No movies found',
  message = 'Try searching for something else or explore popular movies.',
  icon: IconComponent = Film,
  action
}) {
  return (
    <div className="state-container empty-state">
      <div className="empty-icon-wrapper">
        <IconComponent size={40} className="empty-icon" aria-hidden="true" />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-text">{message}</p>
      {action && <div className="empty-action-wrapper">{action}</div>}
    </div>
  );
}
