import { ComponentProps } from "react";

type inputProps = {
  viewSize?: string;
  name: string;
  inputWidth?: string;
  labelName: string;
  value?: string | number;
  type: string;
  placeholder?: string;
  error?: string;
} & ComponentProps<"input">;
function Input({
  viewSize = "default",
  name,
  inputWidth,
  labelName,
  value,
  type,
  placeholder,
  error,
  ...props
}: inputProps) {
  const defaultInputProps =
    "w-full border-b border-gray-4 py-[7px] text-xs md:text-base text-gray-6 outline-none";
  // const smInputProps = "";
  //

  const defaultLabelProps =
    "shrink-0 inline-block w-[45px] md:w-[55px] mr-[13px] md:mr-5 text-[13px] md:text-base font-semibold text-gray-6";
  const smLabelProps =
    "shrink-0 inline-block mr-2 text-sm font-semibold text-gray-6";

  return (
    <div>
      <div className="flex items-center">
        <label
          htmlFor={name}
          className={`
        ${viewSize === "sm" ? smLabelProps : defaultLabelProps}
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
            ${defaultInputProps} ${inputWidth || ""}
        `}
          {...props}
        />
        {/* ${viewSize === "sm" ? smInputProps : defaultInputProps} */}
      </div>
      {error && <p className={`text-red-6 text-[12px] mt-[3px]`}>{error}</p>}
    </div>
  );
}

export default Input;
