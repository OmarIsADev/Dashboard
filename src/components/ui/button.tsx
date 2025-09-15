import { cn } from "@sglara/cn";
import { Loader2 } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "bordered" | "ghost" | "danger";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  style?: CSSProperties;
  isLoading?: boolean;
  icon?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  variant = "primary",
  className,
  style,
  isLoading = false,
  icon,
  onClick,
  ...props
}: ButtonProps) => {
  const variantClassName = {
    primary: "bg-accent-blue hover:bg-accent-hover text-text-light",
    secondary: "bg-gray-300 hover:bg-gray-400 text-gray-800",
    bordered: "bg-trasparent border border-text-dark text-text-dark",
    ghost: "bg-trasparent text-text-dark hover:bg-text-dark/10",
    danger: "bg-error-text hover:bg-red-700 text-white",
  }[variant];

  const isLoadingClassName = {
    primary: "bg-accent-blue/70 hover:accent-blue/70",
    secondary: "bg-gray-300/70 hover:bg-gray-300/70 ",
    bordered: "",
    ghost: "hover:bg-transparent",
    danger: "bg-red-500/70 hover:bg-red-500/70",
  }[variant];

  return (
    <button
      disabled={isLoading}
      style={style}
      className={cn(
        "inline-flex w-full h-fit cursor-pointer items-center justify-center rounded-md px-4 py-2 transition",
        className,
        variantClassName,
        isLoading && `cursor-not-allowed ${isLoadingClassName}`,
        props.disabled && "cursor-not-allowed",
        icon && "p-2 !aspect-square size-8",
      )}
      onClick={onClick}
      {...props}
    >
      <Loader2
        className={cn(
          "mr-0 w-0 animate-spin transition-all",
          isLoading && "mr-2 block w-6 animate-spin",
        )}
      />
      {children}
    </button>
  );
};

export default Button;
