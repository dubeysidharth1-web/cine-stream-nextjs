import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle infinite scrolling using native IntersectionObserver
 * @param {Object} params
 * @param {Function} params.onLoadMore - Callback when sentinel enters viewport
 * @param {boolean} params.hasMore - Whether more pages are available
 * @param {boolean} params.isLoading - Prevents trigger while a request is pending
 * @param {string} params.rootMargin - Viewport margin (defaults to '250px' for pre-fetching)
 * @returns {React.RefObject} Ref to attach to the bottom sentinel element
 */
export function useInfiniteScroll({ onLoadMore, hasMore, isLoading, rootMargin = '250px' }) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry && firstEntry.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [onLoadMore, hasMore, isLoading, rootMargin]);

  return sentinelRef;
}
