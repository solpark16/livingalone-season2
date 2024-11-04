"use client";

import InnerLayout from "@/components/common/Page/InnerLayout";
import Image from "next/image";
import SelectCategory from "./SelectCategory";
import dynamic from "next/dynamic";
import Input from "@/components/common/input/Input";
import Button from "@/components/common/button/Button";
import { usePostSubmit } from "@/hooks/mustpost/usePostSubmit";

const EditorModule = dynamic(
  () => import("@/components/common/editor/EditorModule"),
  {
    ssr: false,
  }
);

function MustWriteForm() {
  const {
    addMustPostBtn,
    error,
    title,
    itemName,
    company,
    price,
    link,
    imgUrl,
    onChangeInput,
    addImageHandler,
    editorRef,
    selectCategory,
    selectedCategoryName,
  } = usePostSubmit();
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
          <div className="flex flex-row gap-2 md:gap-[10px] items-start">
            <input
              className="hidden"
              id="image-file"
              type="file"
              accept="image/*"
              onChange={addImageHandler}
            />
            <label
              className="flex justify-center items-center shrink-0 w-[70px] md:w-[100px] aspect-square text-center font-bold text-sm md:text-base text-gray-4 bg-gray-1 cursor-pointer whitespace-pre-line rounded-lg"
              htmlFor="image-file"
            >
              {imgUrl ? `이미지\n수정` : `이미지\n업로드`}
            </label>

            {error.imageUrlError && (
              <p className={`text-red-3 text-[12px] mt-2`}>
                {error.imageUrlError}
              </p>
            )}
            <div className="w-[70px] md:w-auto aspect-square rounded-[4px]">
              <div className="relative">
                {imgUrl && (
                  <Image
                    src={imgUrl}
                    alt="포스팅한 이미지"
                    width={100}
                    height={100}
                    className="bg-gray-5 rounded-[4px]"
                  />
                )}
              </div>
            </div>
          </div>
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
            onClick={addMustPostBtn}
          />
        </div>
      </div>
    </InnerLayout>
  );
}

export default MustWriteForm;
