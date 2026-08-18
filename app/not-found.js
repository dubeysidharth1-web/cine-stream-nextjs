import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      title="404 — Movie Not Found"
      message="The movie you are looking for does not exist or could not be loaded."
      actionLabel="Back to Popular Movies"
      actionHref="/"
    />
  );
}
