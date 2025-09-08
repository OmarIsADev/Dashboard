import { cn } from "@sglara/cn";
import type { LucideProps } from "lucide-react";

interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
  Prefix?: React.ComponentType<LucideProps>;
  Suffix?: React.ComponentType<LucideProps>;
  className?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

function Input({
  Prefix,
  Suffix,
  className,
  label,
  error,
  errorMessage,
  ...props
}: Input) {
  return (
    <label className="w-full">
      <small>{label}</small>
      <div className="relative">
        {Prefix && (
          <Prefix className="absolute top-1/2 left-6 -translate-1/2" />
        )}
        <input
          className={cn(
            "w-full rounded-md border border-zinc-900 p-2",
            error && "border-red-600",
            Prefix && "pl-10",
            Suffix && "pr-10",
            className,
          )}
          {...props}
        />
        {Suffix && (
          <Suffix className="absolute top-1/2 right-0 -translate-1/2" />
        )}
      </div>
      {error && errorMessage && (
        <small className="text-red-600">{errorMessage}</small>
      )}
    </label>
  );
}

export default Input;
