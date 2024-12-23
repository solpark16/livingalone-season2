"use client";
import { editMyProfile } from "@/apis/mypage";
import Button from "@/components/common/button/Button";
import Error from "@/components/common/error/Error";
import ImageUploader from "@/components/common/input/ImageUploader";
import IsLoading from "@/components/common/loading/IsLoading";
import SearchAddress from "@/components/common/searchAddress/SearchAddress";
import { useInputChange } from "@/hooks/common/useInput";
import { useGetProfile } from "@/hooks/mypage/useGetProfile";
import { TProfile, TProfileError } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Report } from "notiflix";
import { FormEvent, useEffect, useState } from "react";
import Input from "../../common/Input";
import { ProfileValidation } from "./ProfileValidation";
function ProfileForm() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const [imgUrl, setImgUrl] = useState<string>("");
  const [error, setError] = useState<TProfileError>({
    nicknameError: "",
    detailAddressError: "",
    imageUrlError: "",
  });
  const {
    values: input,
    handler: onChangeInput,
    setValues,
  } = useInputChange({
    nickname: "",
    detailAddress: "",
  });
  const { nickname, detailAddress } = input;
  const [address, setAddress] = useState<string | null>("");
  const { prevProfile, isPending, isError } = useGetProfile(userId);

  useEffect(() => {
    if (prevProfile) {
      setImgUrl(prevProfile.profile_image_url);
      setAddress(prevProfile.address);
      setValues({
        detailAddress: prevProfile.detail_address as string,
        nickname: prevProfile.nickname,
      });
    }
  }, [prevProfile, setValues]);

  const queryClient = useQueryClient();

  const { mutate: updateMyProfile } = useMutation({
    mutationFn: (newProfile: TProfile) => editMyProfile(userId, newProfile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      Report.success("프로필이 변경되었습니다.", "", "확인");
    },
  });

  const handleProfileUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prevProfile) return null;
    const newProfile = {
      nickname: nickname || prevProfile.nickname,
      address: address || prevProfile.address,
      detail_address: detailAddress,
      profile_image_url: imgUrl || prevProfile?.profile_image_url,
    };
    const isValid = ProfileValidation(
      setError,
      imgUrl,
      nickname,
      detailAddress
    );
    if (!isValid) return;

    if (
      imgUrl === prevProfile.profile_image_url &&
      nickname === prevProfile.nickname &&
      address === prevProfile.address &&
      detailAddress === prevProfile.detail_address
    ) {
      return Report.info("변경된 내용이 없습니다.", "", "확인");
    }

    updateMyProfile(newProfile);
  };

  if (isPending) return <IsLoading />;
  if (!prevProfile) return <Error />;
  if (isError) return <Error />;

  return (
    <form
      className="pt-[60px] flex flex-col gap-[30px]"
      onSubmit={handleProfileUpdate}
    >
      <div>
        <label className="block mb-2 md:mb-[7px] font-semibold text-xs md:text-[14px] text-gray-5">
          프로필 이미지
        </label>
        <ImageUploader
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          error={error}
          setError={setError}
          postType="profile"
        />
      </div>
      <Input
        name="nickname"
        label="닉네임"
        variantLabel="default"
        variantForm="col"
        variantInput="default"
        type="text"
        onChange={onChangeInput}
        defaultValue={nickname || prevProfile?.nickname || "혼살러"}
        error={error.nicknameError}
      />
      <SearchAddress
        prevProfile={prevProfile}
        address={address}
        setAddress={setAddress}
        detailAddress={detailAddress}
        onChangeInput={onChangeInput}
        error={error}
      />
      <Button
        content="프로필 변경"
        size="lg"
        bgColor="bg-main-6"
        textColor="text-white"
      />
    </form>
  );
}

export default ProfileForm;
