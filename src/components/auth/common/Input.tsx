import Image from "next/image";
import { forwardRef, useId } from "react";

interface InputProps {
  variantInput?: "default" | "underline";
  variantLabel?: "default" | "row" | "smRow";
  variantForm?: "col" | "row";
  label?: string;
  type?: string;
  value?: string | number;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  setPasswordType?: React.Dispatch<React.SetStateAction<boolean>>;
}

const variantInputStyles = {
  default:
    "w-full px-[15px] py-[11px] border border-gray-1 bg-gray-1 text-xs md:text-[14px] text-gray-6 placeholder:text-gray-4 focus:outline-none rounded-lg transition",
  underline:
    "w-full border-b border-gray-4 py-[7px] text-xs md:text-base text-gray-6 outline-none",
};

const variantLabelStyles = {
  default: "mb-2 md:mb-[7px] font-semibold text-xs md:text-[14px] text-gray-5",
  row: "shrink-0 inline-block w-[45px] md:w-[55px] mr-[13px] md:mr-5 text-[13px] md:text-base font-semibold text-gray-6",
  smRow: "shrink-0 inline-block mr-2 text-sm font-semibold text-gray-6",
};

const variantFormStyles = {
  col: "flex flex-col",
  row: "flex items-center",
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    name,
    label,
    variantInput = "default",
    variantLabel = "default",
    variantForm = "col",
    type = "text",
    value,
    placeholder,
    onChange,
    readOnly = false,
    error,
    setPasswordType,
    defaultValue,
  },
  ref
) {
  const inputId = useId();

  const onToggleHide = () => {
    if (setPasswordType) {
      setPasswordType((prev) => !prev);
    }
  };

  return (
    //하나의 인풋-라벨
    <div className={`${variantFormStyles[variantForm]}`}>
      {label && (
        <label
          className={`${variantLabelStyles[variantLabel]}`}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      {type !== "file" && (
        <div className="relative w-full">
          <input
            className={`${variantInputStyles[variantInput]} ${
              error ? "border-red-6" : "border-gray-1"
            }`}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            readOnly={readOnly}
            id={inputId}
            defaultValue={defaultValue}
          />
          {setPasswordType && (
            <button
              onClick={onToggleHide}
              type="button"
              className="absolute top-[10px] right-4"
            >
              {type === "text" ? (
                <Image
                  src="/img/icon-eye.png"
                  alt="눈 아이콘"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/img/icon-eye-see.png"
                  alt="눈 아이콘"
                  width={20}
                  height={20}
                />
              )}
            </button>
          )}
          {error && (
            <p className={`text-red-6 text-[11px] mt-[3px]`}>{error}</p>
          )}
        </div>
      )}
      {type === "file" && (
        <input
          ref={ref}
          type="file"
          className={`${variantInputStyles[variantInput]} text-[10px] py-[10px]`}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
});

export default Input;
