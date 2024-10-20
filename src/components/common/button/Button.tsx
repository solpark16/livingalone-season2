import Link from "next/link";
import React from "react";

interface ButtonProps {
  size: string;
  color: string;
  textColor: string;
  border: string;
  content: string;
  href?: string;
}
function Button({
  size,
  color,
  textColor,
  border,
  href,
  content,
  ...props
}: ButtonProps) {
  const smProps = "px-5 py-[7px] text-xs font-bold";
  const defaultProps = "px-5 py-[7px] text-sm font-bold";
  const lgProps = "w-[232px] text-center text-[15px] font-bold";

  if (href) {
    return (
      <Link href={href}>
        <div className={`${size} ${color} ${textColor} ${border}`}>
          {content}
        </div>
      </Link>
    );
  }
  return (
    <button className={`${size} ${color} ${textColor} ${border}`}>
      {content}
    </button>
  );
}

export default Button;
