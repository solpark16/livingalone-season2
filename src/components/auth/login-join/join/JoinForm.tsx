"use client";
import { useInputChange } from "@/hooks/common/useInput";
import React, { useState } from "react";
import Input from "../../../common/input/Input";
import Button from "@/components/common/button/Button";
import { useSubmitJoin } from "@/hooks/auth/useSubmitJoin";

const JoinForm = () => {
  const { values: input, handler: onChangeInput } = useInputChange({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [passwordType, setPasswordType] = useState(true);
  const [passwordConfirmType, setPasswordConfirmType] = useState(true);

  const { nickname, email, password, passwordConfirm } = input;
  const { error, handleSubmitJoin } = useSubmitJoin(input);

  return (
    <div className="flex flex-col justify-start items-center">
      <form
        onSubmit={handleSubmitJoin}
        className="flex flex-col w-full gap-[25px]"
      >
        <Input
          label="닉네임"
          type="text"
          value={nickname}
          name="nickname"
          placeholder="커뮤니티에서 사용할 닉네임을 적어주세요"
          onChange={onChangeInput}
          error={error.nicknameError}
        />
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
          placeholder="숫자와 영문 조합으로 입력해주세요"
          onChange={onChangeInput}
          error={error.passwordError}
          setPasswordType={setPasswordType}
        />
        <Input
          label="비밀번호 확인"
          type={passwordConfirmType ? "password" : "text"}
          value={passwordConfirm}
          name="passwordConfirm"
          placeholder="비밀번호를 한번 더 입력해주세요."
          onChange={onChangeInput}
          error={error.passwordConfirmError}
          setPasswordType={setPasswordConfirmType}
        />
        <div className="mt-[5px]">
          <Button
            size="lg"
            bgColor="bg-main-6"
            textColor="text-white"
            content="회원가입"
          />
        </div>
      </form>
    </div>
  );
};

export default JoinForm;
