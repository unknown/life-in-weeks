"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { twMerge } from "tailwind-merge";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, max = 100, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={twMerge(
      "relative h-4 w-full overflow-hidden rounded-full bg-neutral-200",
      className,
    )}
    value={value}
    max={max}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-neutral-900 transition-all"
      style={{ transform: `translateX(-${100 - ((value ?? 0) / max) * 100}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
