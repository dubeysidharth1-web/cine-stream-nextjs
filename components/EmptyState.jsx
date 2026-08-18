import Link from "next/link";

/**
 * EmptyState component for zero-result queries or empty favorites list.
 *
 * @param {{ title: string, message: string, actionLabel?: string, actionHref?: string }} props
 */
export default function EmptyState({
  title = "No Movies Found",
  message = "We couldn't find any movies matching your request.",
  actionLabel,
  actionHref,
}) {
  return (
    <div className="empty-container">
      <h2 className="state-title">{title}</h2>
      <p className="state-text">{message}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
