import Image from "next/image";
import { forwardRef, useId } from "react";

interface InputProps {
  variant?: "default" | "underline";
  label?: string;
  type?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  setPasswordType?: React.Dispatch<React.SetStateAction<boolean>>;
}

const variantStyles = {
  default:
    "w-full px-[15px] py-[11px] rounded-lg bg-gray-1 text-xs md:text-[14px] text-gray-6 placeholder-gray-4 focus:outline-none transition",
  underline:
    "border-b w-full px-1 py-2 md:text-[20px] text-[16px] placeholder-gray-2 focus:outline-none focus:border-black transition rounded-none",
};

// 3. forwardRef로 전달 받음
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    name,
    label,
    variant = "default",
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
    <div className="flex flex-col">
      {label && (
        <label
          className="mb-2 md:mb-[7px] font-semibold text-xs md:text-[14px] text-gray-5"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      {/* 입력창       */}
      {(type === "text" || type === "password") && (
        <div className="relative flex items-center">
          <input
            className={`${variantStyles[variant]} ${
              error ? "border-red-3" : "border-gray-2"
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
              className="absolute right-4"
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
        </div>
      )}
      {type === "file" && (
        <input
          // 4. ref 담기
          ref={ref}
          type="file"
          className={`${variantStyles[variant]} text-[10px] py-[10px]`}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      {error && <p className={`text-red-3 text-[12px] mt-2`}>{error}</p>}
    </div>
  );
});

export default Input;
