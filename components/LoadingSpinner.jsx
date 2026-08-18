/**
 * LoadingSpinner component for accessible loading indicators.
 *
 * @param {{ message?: string }} props
 */
export default function LoadingSpinner({ message = "Loading movie collection..." }) {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p className="state-text">{message}</p>
      <span className="sr-only">Loading content, please wait</span>
    </div>
  );
}
