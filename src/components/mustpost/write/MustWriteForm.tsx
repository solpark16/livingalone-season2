"use client";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { MustCategory, TMustError } from "@/types/types";
import React, { useRef, useState } from "react";
import SelectCategory from "./SelectCategory";
import { useInputChange } from "@/hooks/common/useInput";
import { EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";

import Input from "@/components/common/input/Input";
import Button from "@/components/common/button/Button";
import ImageUploader from "@/components/common/input/ImageUploader";
import { usePostSubmit } from "@/hooks/common/usePostSubmit";

const EditorModule = dynamic(
  () => import("@/components/common/editor/EditorModule"),
  {
    ssr: false,
  }
);

function MustWriteForm() {
  const [imgUrl, setImgUrl] = useState<string>("");

  const editorRef = useRef<EditorProps>(null);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>("선택");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const [error, setError] = useState<TMustError>({
    titleError: "",
    categoryError: "",
    itemNameError: "",
    companyError: "",
    priceError: "",
    imageUrlError: "",
  });

  const { values: input, handler: onChangeInput } = useInputChange({
    title: "",
    date: "",
    itemName: "",
    company: "",
    price: 0,
    content: "",
    link: "",
  });
  const { title, itemName, company, price, link } = input;

  const selectCategory = (category: MustCategory) => {
    setSelectedCategoryName(category.name);
    setSelectedCategoryId(category.id);
  };

  const { addPostHandler } = usePostSubmit(
    {
      title,
      itemName,
      company,
      price,
      link,
      imgUrl,
      editorRef,
      selectedCategoryId,
      setError,
      item: itemName,
    },
    "must"
  );

  return (
    <InnerLayout>
      <div className="pb-[76px] md:pb-0">
        <form className="flex flex-col gap-3 md:gap-5 mt-[43px] md:mt-0">
          <SelectCategory
            selectCategory={selectCategory}
            initialCategoryName={selectedCategoryName}
            error={error.categoryError}
          />
          <Input
            name="title"
            labelName="제목"
            value={title}
            type="text"
            placeholder="제목을 입력해주세요."
            onChange={onChangeInput}
            error={error.titleError}
          />
          <Input
            name="itemName"
            labelName="상품이름"
            value={itemName}
            type="text"
            placeholder="상품명을 입력해주세요."
            onChange={onChangeInput}
            error={error.itemNameError}
          />

          <Input
            name="company"
            labelName="제작업체"
            value={company}
            type="text"
            placeholder="제작업체 또는 브랜드를 입력해주세요."
            onChange={onChangeInput}
            error={error.companyError}
          />

          <Input
            name="price"
            labelName="판매가격"
            value={price || ""}
            type="number"
            placeholder="0"
            onChange={onChangeInput}
            error={error.priceError}
          />

          <Input
            name="link"
            labelName="상품링크"
            value={link || ""}
            type="text"
            placeholder="(선택사항) 상품 소개 페이지 링크를 넣어주세요."
            onChange={onChangeInput}
          />
          <ImageUploader
            imgUrl={imgUrl}
            setImgUrl={setImgUrl}
            error={error}
            setError={setError}
            postType="must"
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
      </div>
    </InnerLayout>
  );
}

export default MustWriteForm;
