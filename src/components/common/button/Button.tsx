import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type ButtonProps = {
  size?: string;
  height?: string;
  bgColor?: string;
  textColor: string;
  outline?: string;
  content: string;
  href?: string;
  imgUrl?: string;
  imgAlt?: string;
} & ComponentProps<"button">;
function Button({
  size = "default",
  height,
  bgColor,
  textColor,
  outline,
  href,
  content,
  imgUrl,
  imgAlt = "url 아이콘",
  ...props
}: ButtonProps) {
  const smProps = "px-[7px] py-[4px] text-xs font-bold rounded";
  const defaultProps =
    "px-[13px] py-[4px] md:px-5 md:py-[7px] text-[13px] md:text-[15px] font-bold rounded-full";
  const lgProps =
    "flex items-center justify-center w-[230px] md:w-[280px] py-[7px] text-center text-[14px] md:text-[16px] font-bold rounded-full";

  const outlineProps = outline ? `border bg-white ${outline}` : "";

  const buttonContents = imgUrl ? (
    <div className="flex flex-row justify-center gap-[5px]">
      <Image src={imgUrl} alt={imgAlt} width={20} height={20} />
      {content}
    </div>
  ) : (
    content
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${
          size === "sm" ? smProps : size === "lg" ? lgProps : defaultProps
        } ${bgColor} ${textColor} ${outlineProps} ${height}`}
      >
        {buttonContents}
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
      {buttonContents}
    </button>
  );
}

export default Button;
