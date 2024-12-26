export function ProfileValidation(
  setError: React.Dispatch<
    React.SetStateAction<{
      nicknameError: string;
      detailAddressError: string;
      imageUrlError: string;
    }>
  >,
  imgUrl: string,
  nickname: string,
  detailAddress: string
): boolean {
  setError({
    nicknameError: "",
    detailAddressError: "",
    imageUrlError: "",
  });

  if (nickname.length === 0 || nickname.length > 8 || nickname.length < 2) {
    setError((prev) => ({
      ...prev,
      nicknameError: "닉네임은 2자 이상 8자 이하로 입력해주세요.",
    }));
    return false;
  }

  if (detailAddress === "") {
    setError((prev) => ({
      ...prev,
      detailAddressError: "상세 주소를 입력해주세요.",
    }));
    return false;
  }

  return true;
}
