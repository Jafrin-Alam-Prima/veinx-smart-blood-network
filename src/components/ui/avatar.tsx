import { cn } from "@/lib/utils";

export function Avatar({
  name,
  src,
  className,
  ring,
}: {
  name: string;
  src?: string;
  className?: string;
  ring?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-secondary to-accent text-sm font-semibold text-foreground/90",
        ring && "ring-2 ring-primary/50",
        className,
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
