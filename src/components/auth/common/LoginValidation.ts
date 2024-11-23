import { emailRegex, passwordRegex } from "@/constants/regex";

export function LoginValidation(
  setError: React.Dispatch<
    React.SetStateAction<{
      emailError: string;
      passwordError: string;
    }>
  >,
  email: string,
  password: string
): boolean {
  setError({
    emailError: "",
    passwordError: "",
  });

  if (!emailRegex.test(email)) {
    setError((prev) => ({
      ...prev,
      emailError: "이메일 형식으로 입력해주세요. ex) example@example.com",
    }));
    return false;
  }

  if (!passwordRegex.test(password)) {
    setError((prev) => ({
      ...prev,
      passwordError: "비밀번호를 입력해주세요.",
    }));
    return false;
  }

  return true;
}
