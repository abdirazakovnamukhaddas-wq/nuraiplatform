import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/** Consistent max-width + horizontal padding wrapper used across all sections. */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}
      {...props}
    />
  );
}
