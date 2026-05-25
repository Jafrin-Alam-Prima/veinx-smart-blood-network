import { cn } from "@/lib/utils";

export function DropMark({
  className,
  pulse,
}: {
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span className={cn("relative inline-flex", className)}>
      {pulse && (
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/40" />
      )}
      <svg viewBox="0 0 120 120" fill="none" className="relative size-full">
        <defs>
          <linearGradient id="vx-mark" x1="20" y1="8" x2="100" y2="112">
            <stop stopColor="#FF4D6D" />
            <stop offset="1" stopColor="#B3123A" />
          </linearGradient>
        </defs>
        <path
          d="M60 8C60 8 96 50 96 76C96 95.88 79.88 112 60 112C40.12 112 24 95.88 24 76C24 50 60 8 60 8Z"
          fill="url(#vx-mark)"
        />
        <path
          d="M44 54L60 88L76 54"
          stroke="white"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M52 70H68" stroke="white" strokeWidth="7" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  showWord = true,
}: {
  className?: string;
  showWord?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <DropMark className="size-8" />
      {showWord && (
        <span className="text-lg font-bold tracking-tight">
          Vein<span className="text-primary">X</span>
        </span>
      )}
    </span>
  );
}
