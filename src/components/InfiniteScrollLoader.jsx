import React from 'react';
import { Loader2 } from 'lucide-react';

export default function InfiniteScrollLoader({ sentinelRef, hasMore, isLoadingMore }) {
  return (
    <div ref={sentinelRef} className="infinite-scroll-sentinel" aria-hidden="true">
      {isLoadingMore && (
        <div className="infinite-loader-content">
          <Loader2 className="spinner-icon" size={24} />
          <span>Loading more movies...</span>
        </div>
      )}
      {!hasMore && (
        <div className="infinite-loader-end">
          <span>You've reached the end of the collection.</span>
        </div>
      )}
    </div>
  );
}
