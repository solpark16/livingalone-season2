import { PropsWithChildren } from "react";
import clsx from "clsx";

type ButtonProps = PropsWithChildren<{
  variant?: "primary" | "secondary";
  className?: string;
}>;

function Button({ children, variant = "primary", className }: ButtonProps) {
  const baseStyles = "text-white font-bold py-2 px-4 focus:outline-none";
  const variantStyles = {
    primary: "bg-black hover:bg-slate-800 rounded-full",
    secondary: "bg-blue-500 hover:bg-blue-700 rounded",
  };
  return (
    <button className={clsx(baseStyles, variantStyles[variant], className)}>
      {children}
    </button>
  );
}

export default Button;
