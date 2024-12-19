"use client";

import InnerLayout from "@/components/common/Page/InnerLayout";
import Button from "@/components/common/button/Button";
import ImageUploader from "@/components/common/input/ImageUploader";
import { useInputChange } from "@/hooks/common/useInput";
import { TGroupError } from "@/types/types";

import { EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";

import Input from "@/components/auth/common/Input";
import { usePostSubmit } from "@/hooks/common/usePostSubmit";
import Image from "next/image";
import { useRef, useState } from "react";
import GroupPostNotice from "../common/GroupPostNotice";

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
      isFree,
    },
    "group"
  );

  return (
    <InnerLayout>
      <GroupPostNotice checkBox={checkBox} setCheckBox={setCheckBox} />

      <form className="flex flex-col gap-3 md:gap-5 mt-[30px] md:mt-[32px]">
        <Input
          name="title"
          label="제목"
          variantLabel="row"
          variantForm="row"
          variantInput="underline"
          type="text"
          value={title}
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
          <div className="flex items-center gap-[41px]">
            <Input
              name="endDate"
              label="마감일"
              variantLabel="smRow"
              variantForm="row"
              variantInput="underline"
              type="date"
              value={endDate}
              onChange={onChangeInput}
              error={error.endDateError}
            />
            <Input
              name="peopleNum"
              label="공구인원"
              variantLabel="row"
              variantForm="row"
              variantInput="underline"
              type="number"
              value={peopleNum || ""}
              placeholder="0"
              onChange={onChangeInput}
              error={error.peopleNumError}
            />
          </div>
        </div>

        <Input
          name="item"
          label="상품명"
          variantLabel="row"
          variantForm="row"
          variantInput="underline"
          type="text"
          value={item}
          placeholder="제품명을 입력해주세요"
          onChange={onChangeInput}
          error={error.itemError}
        />
        <Input
          name="price"
          label="공구가격"
          variantLabel="row"
          variantForm="row"
          variantInput="underline"
          type="number"
          value={price || ""}
          placeholder="원 단위로 입력해주세요"
          onChange={onChangeInput}
          error={error.priceError}
        />
        <Input
          name="regularPrice"
          label="판매가격"
          variantLabel="row"
          variantForm="row"
          variantInput="underline"
          type="number"
          value={regularPrice || ""}
          placeholder="사이트에서 판매되고 있는 가격을 입력해주세요."
          onChange={onChangeInput}
          error={error.regularPriceError}
        />
        <Input
          name="link"
          label="상품링크"
          variantLabel="row"
          variantForm="row"
          variantInput="underline"
          type="text"
          value={link}
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
          postType="groupposts"
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
