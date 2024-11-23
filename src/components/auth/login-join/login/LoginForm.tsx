"use client";

import { googleLogin, kakaoLogin, login } from "@/apis/auth";
import { emailRegex } from "@/constants/regex";
import { useInputChange } from "@/hooks/common/useInput";
import { useAuthStore } from "@/zustand/authStore";
import { useRouter } from "next/navigation";
import { Notify, Report } from "notiflix";
import { useState } from "react";
import Input from "../../common/Input";
import Button from "@/components/common/button/Button";

const LoginForm = () => {
  const router = useRouter();
  const saveUser = useAuthStore((state) => state.saveUser);

  const { values: input, handler: onChangeInput } = useInputChange({
    email: "",
    password: "",
  });

  const [passwordType, setPasswordType] = useState(true);
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const { email, password } = input;

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = { email, password };

    if (!emailRegex.test(email)) {
      setError((prev) => ({
        ...prev,
        emailError: "이메일 형식으로 입력해주세요. ex) example@example.com",
      }));
      return;
    }

    const { data, error } = await login(loginData);

    if (error) {
      return Report.failure(
        "로그인에 실패했습니다.",
        "아이디와 비밀번호를 정확히 입력해 주세요.",
        "확인"
      );
    }

    saveUser(data.user);
    Notify.success("로그인에 성공했습니다.");
    router.push("/");
  };

  const handleGoogleLogin = async () => {
    const { error } = await googleLogin();
    if (error) return Report.failure("구글 로그인에 실패했습니다.", "", "확인");
  };

  const handleKakaoLogin = async () => {
    const { error } = await kakaoLogin();
    if (error)
      return Report.failure("카카오 로그인에 실패했습니다.", "", "확인");
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <form
        onSubmit={handleLoginSubmit}
        className="flex flex-col w-full gap-[25px]"
      >
        <Input
          label="이메일"
          type="text"
          value={email}
          name="email"
          placeholder="이메일 주소를 입력해주세요"
          onChange={onChangeInput}
          error={error.emailError}
        />
        <Input
          label="비밀번호"
          type={passwordType ? "password" : "text"}
          value={password}
          name="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={onChangeInput}
          error={error.passwordError}
          setPasswordType={setPasswordType}
        />
        <div className="mt-[5px] mb-[30px]">
          <Button
            size="lg"
            bgColor="bg-main-6"
            textColor="text-white"
            content="로그인"
          />
        </div>
      </form>
      <div className="w-full border-b border-gray-2"></div>
      <div className="flex flex-col items-center gap-[10px] w-full mt-[30px]">
        <Button
          size="lg"
          height="h-9"
          bgColor="bg-blue-6"
          textColor="text-white"
          content="회원가입"
          href="/join"
        />
        <Button
          size="lg"
          outline="border border-gray-4"
          textColor="text-gray-6"
          content="구글 간편로그인"
          imgUrl="/img/icon-google.png"
          imgAlt="구글 로그인 로고"
          onClick={handleGoogleLogin}
        />
        <Button
          size="lg"
          outline="border border-gray-4"
          textColor="text-gray-6"
          content="카카오 간편로그인"
          imgUrl="/img/kakaotalk-icon.png"
          imgAlt="카카오 로그인 로고"
          onClick={handleKakaoLogin}
        />
      </div>
    </div>
  );
};

export default LoginForm;
