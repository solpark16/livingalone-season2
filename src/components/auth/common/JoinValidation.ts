import { emailRegex, passwordRegex } from "@/constants/regex";

export function JoinValidation(
  setError: React.Dispatch<
    React.SetStateAction<{
      emailError: string;
      passwordError: string;
      passwordConfirmError: string;
      nicknameError: string;
    }>
  >,
  email: string,
  password: string,
  passwordConfirm: string,
  nickname: string
): boolean {
  setError({
    emailError: "",
    passwordError: "",
    passwordConfirmError: "",
    nicknameError: "",
  });

  // if (!nickname.trim()) {
  //   setError((prev) => ({
  //     ...prev,
  //     nicknameError: "",
  //   }));
  //   return false;
  // }

  if (nickname.length <= 2 || nickname.length > 8) {
    setError((prev) => ({
      ...prev,
      nicknameError: "닉네임은 2~8글자 사이로 입력해주세요",
    }));
    return false;
  }

  if (!emailRegex.test(email)) {
    setError((prev) => ({
      ...prev,
      emailError: "이메일 형식으로 입력해주세요. ex) example@example.com",
    }));
    return false;
  }

  if (!passwordRegex.test(password) || password.length < 6) {
    setError((prev) => ({
      ...prev,
      passwordError:
        "비밀번호는 숫자와 영문자, 특수문자 조합으로 6자리 이상 15자리 이하여야 합니다.",
    }));
    return false;
  }

  if (password !== passwordConfirm) {
    setError((prev) => ({
      ...prev,
      passwordConfirmError: "비밀번호가 일치하지 않습니다.",
    }));
    return false;
  }

  return true;
}
