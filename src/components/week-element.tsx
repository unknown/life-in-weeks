import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const weekVariants = cva("h-4 w-4 rounded-sm", {
  variants: {
    variant: {
      present: "bg-blue-400",
      future: "bg-neutral-100",
      birthday: "bg-neutral-900",
      past: "bg-neutral-300",
    },
  },
});

type WeekElementProps = {
  tooltipContent?: React.ReactNode;
} & VariantProps<typeof weekVariants>;

export const WeekElement = function WeekElement({ variant, tooltipContent }: WeekElementProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={weekVariants({ variant })} />
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
