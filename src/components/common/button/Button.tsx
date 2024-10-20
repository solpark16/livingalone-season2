import Link from "next/link";
import React, { ComponentProps } from "react";

type ButtonProps = {
  size?: string;
  color: string;
  textColor: string;
  outline?: boolean;
  content: string;
  href?: string;
} & ComponentProps<"button">;
function Button({
  size = "default",
  color,
  textColor,
  outline,
  href,
  content,
  ...props
}: ButtonProps) {
  const smProps = "px-5 py-[7px] text-xs font-bold rounded-full";
  const defaultProps = "px-5 py-[7px] text-sm font-bold rounded-full";
  const lgProps = "w-[232px] text-center text-[15px] font-bold rounded-full";

  const outlineProps = `border bg-white border-${color}`;

  if (href) {
    return (
      <Link href={href}>
        <div
          className={`${
            size === "sm" ? smProps : size === "lg" ? lgProps : defaultProps
          } bg-${color} text-${textColor} ${outline && outlineProps}`}
        >
          {content}
        </div>
      </Link>
    );
  }
  return (
    <button
      className={`${
        size === "sm" ? smProps : size === "lg" ? lgProps : defaultProps
      } bg-${color} text-${textColor} ${outline && outlineProps}`}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
