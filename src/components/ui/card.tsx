import { cn } from "@sglara/cn";
import type { HTMLAttributes } from "react";

function CardGroup({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center *:rounded-none *:not-last:border-r-0 *:nth-[1]:rounded-l-lg *:nth-last-[1]:rounded-r-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Card({
  analytic,
  title,
  className,
  classNames,
  children,
  ...props
}: {
  analytic?: boolean;
  title?: string;
  classNames?: { title?: string; wrapper?: string };
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-bg-card border-border-light flex w-full flex-col gap-3 rounded-xl border p-5",
        className,
        classNames?.wrapper,
        analytic && "text-2xl leading-8 font-bold",
      )}
      {...props}
    >
      {title && (
        <h1
          className={cn(
            "text-text-dark text-xl leading-4 font-semibold",
            classNames?.title,
            analytic && "text-text-dark/80 text-base leading-3.5 font-medium",
          )}
        >
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}

export { Card, CardGroup };
