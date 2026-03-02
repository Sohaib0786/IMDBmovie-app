import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "positive" | "mixed" | "negative" | "outline";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
        {
          "bg-purple-500/20 text-purple-300 border border-purple-500/30": variant === "default",
          "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30": variant === "positive",
          "bg-amber-500/20 text-amber-300 border border-amber-500/30": variant === "mixed",
          "bg-red-500/20 text-red-300 border border-red-500/30": variant === "negative",
          "bg-transparent text-gray-400 border border-gray-600": variant === "outline",
        }
      )}
    >
      {children}
    </span>
  );
}