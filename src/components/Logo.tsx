export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const finance = variant === "light" ? "text-white" : "text-navy";
  return (
    <div
      className={`font-display text-2xl tracking-tight ${className}`}
      aria-label="Finance Alchemist"
    >
      <span className={`font-bold ${finance}`}>Finance</span>
      <span className="text-amber font-bold ml-1">Alchemist</span>
    </div>
  );
}
