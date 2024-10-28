import Link from "next/link";
import { ComponentProps } from "react";

type ButtonProps = {
  size?: string;
  bgColor?: string;
  textColor: string;
  outline?: string;
  content: string;
  href?: string;
} & ComponentProps<"button">;
function Button({ size = "default", bgColor, textColor, outline, href, content, ...props }: ButtonProps) {
  const smProps = "px-[7px] py-[4px] text-xs font-bold rounded-lg";
  const defaultProps = "px-5 py-[7px] text-sm font-bold rounded-full";
  const lgProps = "w-[280px] text-center text-[15px] font-bold rounded-full";

  const outlineProps = outline ? `border bg-white ${outline}` : "";

  if (href) {
    return (
      <Link
        href={href}
        className={`${
          size === "sm" ? smProps : size === "lg" ? lgProps : defaultProps
        } ${bgColor} ${textColor} ${outlineProps}`}
      >
        {content}
      </Link>
    );
  }
  return (
    <button
      className={`${
        size === "sm" ? smProps : size === "lg" ? lgProps : defaultProps
      } ${bgColor} ${textColor} ${outlineProps} cursor-pointer`}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
