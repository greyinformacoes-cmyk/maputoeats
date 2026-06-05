import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

export function Logo({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const word = variant === "light" ? "text-foreground" : "text-ink-foreground";
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        <Sprout className="size-6" strokeWidth={2.4} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold ${word}`}>comida</span>
        <span className="font-display text-lg font-extrabold text-primary -mt-0.5">
          saudável mz
        </span>
      </span>
    </Link>
  );
}
