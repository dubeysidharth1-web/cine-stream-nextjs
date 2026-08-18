/**
 * ErrorMessage component for graceful API error displays.
 *
 * @param {{ title?: string, message?: string, onRetry?: () => void }} props
 */
export default function ErrorMessage({
  title = "Something went wrong",
  message = "Unable to load movie data at this time. Please verify your connection or API key.",
  onRetry,
}) {
  return (
    <div className="error-container" role="alert">
      <h2 className="state-title">{title}</h2>
      <p className="state-text">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
}
