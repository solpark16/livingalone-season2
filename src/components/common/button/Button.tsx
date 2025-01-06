import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type ButtonProps = {
  size?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  textColor: string;
  textSize?: string;
  outline?: string;
  content: string;
  href?: string;
  imgUrl?: string;
  imgAlt?: string;
} & ComponentProps<"button">;
function Button({
  size = "default",
  width,
  height,
  bgColor,
  textColor,
  textSize,
  outline,
  href,
  content,
  imgUrl,
  imgAlt = "url 아이콘",
  ...props
}: ButtonProps) {
  const smProps = "px-[7px] py-[4px] text-xs font-bold rounded shrink-0";
  const defaultProps =
    "px-[13px] py-[4px] md:px-5 md:py-[7px] text-[13px] md:text-[15px] font-bold rounded-full";
  const lgProps =
    "flex items-center justify-center w-[230px] md:w-[280px] py-[7px] text-center text-[14px] md:text-[16px] font-bold rounded-full";

  const outlineProps = outline ? `border bg-white ${outline}` : "";

  const buttonContents = imgUrl ? (
    <div className="flex flex-row justify-center items-center gap-[5px]">
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
        } ${bgColor} ${textColor} ${outlineProps} ${width} ${height} ${textSize}`}
      >
        {buttonContents}
      </Link>
    );
  }
  return (
    <button
      className={`${
        size === "sm" ? smProps : size === "lg" ? lgProps : defaultProps
      } ${bgColor} ${textColor} ${outlineProps} ${width} ${height} ${textSize} cursor-pointer`}
      {...props}
    >
      {buttonContents}
    </button>
  );
}

export default Button;
