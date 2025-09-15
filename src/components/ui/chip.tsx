import { cn } from "@sglara/cn";
import React from "react";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "success" | "error" | "info" | "warning";
}

function Chip({ className, color = "success", children }: ChipProps) {
  const colorClasses = {
    success: "bg-success-bg border-green-600",
    error: "bg-error-bg border-red-600",
    info: "bg-info-bg border-blue-600",
    warning: "bg-warning-bg border-yellow-600",
  }[color];

  return (
    <div
      className={cn(
        "bg-success-bg rounded border py-px px-1 text-center text-sm",
        className,
        colorClasses,
      )}
    >
      {children}
    </div>
  );
}

export default Chip;
