import { Link } from "@tanstack/react-router";

export function SectionHeading({
  title,
  to,
  linkLabel = "Ver todas",
}: {
  title: string;
  to?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
      {to ? (
        <Link
          to={to}
          className="shrink-0 text-sm font-semibold text-primary transition-colors hover:text-primary-glow"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
