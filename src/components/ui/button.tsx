"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] select-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_rgba(255,45,85,0.6)] hover:bg-primary-bright hover:shadow-[0_10px_30px_-6px_rgba(255,45,85,0.7)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-accent border border-border",
        ghost: "text-foreground/80 hover:bg-white/5 hover:text-foreground",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-white/5",
        glass:
          "glass text-foreground hover:border-border-strong hover:bg-white/[0.07]",
        danger:
          "bg-danger text-white shadow-[0_8px_24px_-8px_rgba(255,45,85,0.6)] hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3.5 text-[13px]",
        md: "h-11 px-5",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
        pill: "h-11 px-6 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
