import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

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

type WeekElementProps = VariantProps<typeof weekVariants>;

export const WeekElement = function WeekElement({ variant }: WeekElementProps) {
  return <div className={weekVariants({ variant })} />;
};
