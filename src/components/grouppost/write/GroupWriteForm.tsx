"use client";

import InnerLayout from "@/components/common/Page/InnerLayout";
import Button from "@/components/common/button/Button";
import ImageUploader from "@/components/common/input/ImageUploader";
import Input from "@/components/common/input/Input";
import { useInputChange } from "@/hooks/common/useInput";
import { TGroupError } from "@/types/types";

import { EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";

import { useRef, useState } from "react";
import GroupPostNotice from "../common/GroupPostNotice";
import Image from "next/image";
import { usePostSubmit } from "@/hooks/common/usePostSubmit";

const EditorModule = dynamic(
  () => import("@/components/common/editor/EditorModule"),
  {
    ssr: false,
  }
);

function GroupWriteForm() {
  const [checkBox, setCheckBox] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>("");

  const editorRef = useRef<EditorProps>(null);

  const [error, setError] = useState<TGroupError>({
    titleError: "",
    endDateError: "",
    peopleNumError: "",
    itemError: "",
    priceError: "",
    regularPriceError: "",
    imageUrlError: "",
  });

  const { values: input, handler: onChangeInput } = useInputChange({
    title: "",
    endDate: "",
    content: "",
    item: "",
    link: "",
    peopleNum: 0,
    price: 0,
    isFree: false,
    regularPrice: 0,
  });
  const { title, endDate, item, link, peopleNum, price, isFree, regularPrice } =
    input;

  const { addPostHandler } = usePostSubmit(
    {
      title,
      endDate,
      peopleNum,
      price,
      regularPrice,
      link,
      imgUrl,
      editorRef,
      setError,
      item,
      checkBox,
    },
    "group"
  );

  return (
    <InnerLayout>
      <GroupPostNotice checkBox={checkBox} setCheckBox={setCheckBox} />

      <form className="flex flex-col gap-3 md:gap-5 mt-[30px] md:mt-[32px]">
        <Input
          name="title"
          labelName="제목"
          value={title}
          type="text"
          placeholder="제목을 입력해주세요"
          onChange={onChangeInput}
          error={error.titleError}
        />
        <div className="flex items-center">
          <label
            htmlFor="endDate"
            className="w-[45px] md:w-[55px] mr-[13px] md:mr-5 items-center md:text-base font-semibold text-gray-6"
          >
            공구기간
          </label>
          <div className="flex gap-[41px]">
            <Input
              name="endDate"
              labelName="마감일"
              value={endDate}
              type="date"
              onChange={onChangeInput}
              error={error.endDateError}
              viewSize="sm"
            />
            <Input
              name="peopleNum"
              labelName="공구인원"
              value={peopleNum || ""}
              type="number"
              placeholder="0"
              onChange={onChangeInput}
              error={error.peopleNumError}
              inputWidth="w-[83px]"
            />
          </div>
        </div>

        <Input
          name="item"
          labelName="상품명"
          value={item}
          type="text"
          placeholder="제품명을 입력해주세요"
          onChange={onChangeInput}
          error={error.itemError}
        />
        <Input
          name="price"
          labelName="공구가격"
          value={price || ""}
          type="number"
          placeholder="원 단위로 입력해주세요"
          onChange={onChangeInput}
          error={error.priceError}
        />
        <Input
          name="regularPrice"
          labelName="판매가격"
          value={regularPrice || ""}
          type="number"
          placeholder="사이트에서 판매되고 있는 가격을 입력해주세요."
          onChange={onChangeInput}
          error={error.regularPriceError}
        />
        <Input
          name="link"
          labelName="상품링크"
          value={link}
          type="text"
          placeholder="(선택사항) 상품소개 페이지 링크를 넣어주세요."
          onChange={onChangeInput}
        />
        <div className="flex">
          <label className="shrink-0 inline-block w-[45px] md:w-[55px] mr-[13px] md:mr-5 text-[13px] md:text-base font-semibold text-gray-6">
            배송비
          </label>
          <label htmlFor="isFree">
            <input
              id="isFree"
              type="checkbox"
              name="isFree"
              checked={isFree}
              onChange={onChangeInput}
              className="hidden"
            />
            {isFree ? (
              <Image
                src={"/img/icon-isFree-fill.svg"}
                alt="배송비 포함"
                width={48}
                height={24}
                className="cursor-pointer"
              />
            ) : (
              <Image
                src={"/img/icon-isFree-stroke.svg"}
                alt="배송비 미포함"
                width={48}
                height={24}
                className="cursor-pointer"
              />
            )}
          </label>
        </div>

        <ImageUploader
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          error={error}
          setError={setError}
          postType="group"
        />
        <div className="mb-[22px] md:mb-[45px]">
          <EditorModule editorRef={editorRef} />
        </div>
      </form>
      <div className="flex justify-center pb-[123px] md:pb-0 mt-[18px] md:mt-[6px]">
        <Button
          size="lg"
          bgColor="bg-main-7"
          textColor="text-white"
          content="등록하기"
          onClick={addPostHandler}
        />
      </div>
    </InnerLayout>
  );
}

export default GroupWriteForm;
