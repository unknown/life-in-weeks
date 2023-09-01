import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const weekVariants = cva("h-4 w-4 rounded-sm", {
  variants: {
    variant: {
      default: "bg-neutral-300",
      primary: "bg-neutral-900",
      active: "bg-blue-400",
      disabled: "bg-neutral-100",
    },
  },
});

type WeekElementProps = {
  tooltipContent?: React.ReactNode;
} & VariantProps<typeof weekVariants>;

export const WeekElement = function WeekElement({ variant, tooltipContent }: WeekElementProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={weekVariants({ variant })} />
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
