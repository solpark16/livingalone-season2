import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import { join } from "@/apis/auth";

import { useState } from "react";
import { JoinValidation } from "@/components/auth/common/JoinValidation";

export const useSubmitJoin = (input: {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  const router = useRouter();
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    passwordConfirmError: "",
    nicknameError: "",
  });

  const handleSubmitJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { nickname, email, password, passwordConfirm } = input;
    const joinData = { nickname, email, password };

    const isValid = JoinValidation(
      setError,
      email,
      password,
      passwordConfirm,
      nickname
    );
    if (!isValid) return;

    const data = await join(joinData);

    if (data.message === "User already registered") {
      return setError((prev) => ({
        ...prev,
        emailError: "이미 등록된 이메일 입니다.",
      }));
    }

    Notify.success("회원가입이 성공적으로 완료되었습니다.");
    router.push("/login");
  };

  return { error, handleSubmitJoin };
};
