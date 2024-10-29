import { ComponentProps } from "react";

type inputProps = {
  viewSize?: string;
  name: string;
  inputWidth?: string;
  labelWidth?: string;
  labelName: string;
  value?: string | number;
  type: string;
  placeholder?: string;
} & ComponentProps<"input">;
function Input({
  viewSize = "default",
  name,
  inputWidth,
  labelName,
  value,
  type,
  placeholder,
  ...props
}: inputProps) {
  const defaultInputProps =
    "w-[565px] border-b border-gray-4 py-[7px] text-base text-gray-6 outline-none";
  const smInputProps = "";

  const defaultLabelProps =
    "inline-block w-[55px] mr-5 text-base font-semibold text-gray-6";
  const smLabelProps = "inline-block w-[45px]";

  return (
    <div className="flex items-center">
      <label
        htmlFor={name}
        className={`
        ${viewSize === "mobile" ? smLabelProps : defaultLabelProps}
        `}
      >
        {labelName}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`
        ${viewSize === "mobile" ? smInputProps : defaultInputProps}
        ${inputWidth}
        `}
        {...props}
      />
    </div>
  );
}

export default Input;
