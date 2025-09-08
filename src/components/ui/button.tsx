import { cn } from "@sglara/cn";
import { Loader2 } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  style?: CSSProperties;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  variant = "primary",
  className,
  style,
  isLoading = false,
  onClick,
  ...props
}: ButtonProps) => {
  const variantClassName = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-300 hover:bg-gray-400 text-gray-800",
    danger: "bg-red-500 hover:bg-red-700 text-white",
  }[variant];

  const isLoadingClassName = {
    primary: "bg-blue-500/70 hover:bg-blue-500/70",
    secondary: "bg-gray-300/70 hover:bg-gray-300/70 ",
    danger: "bg-red-500/70 hover:bg-red-500/70",
  }[variant];

  return (
    <button
      className={cn(
        "flex w-full cursor-pointer items-center justify-center rounded-md px-4 py-2",
        className,
        variantClassName,
        isLoading && `cursor-not-allowed ${isLoadingClassName}`,
      )}
      style={style}
      onClick={onClick}
      {...props}
    >
      <Loader2
        className={cn(
          "mr-0 w-0 animate-spin transition-all",
          isLoading && "block animate-spin w-6 mr-2",
        )}
      />
      {children}
    </button>
  );
};

export default Button;
