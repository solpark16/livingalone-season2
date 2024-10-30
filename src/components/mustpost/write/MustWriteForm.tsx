"use client";

import { insertMustImage, insertMustPost } from "@/apis/mustpost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { MustCategory, TNewMustPost } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

import { Notify } from "notiflix";

import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SelectCategory from "./SelectCategory";

import { useInputChange } from "@/hooks/common/useInput";
import { useAuthStore } from "@/zustand/authStore";
import { useCategoryStore } from "@/zustand/mustStore";
import { EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { mustValidation } from "../common/MustValidation";

import imageCompression from "browser-image-compression";
import Input from "@/components/common/input/Input";
import Button from "@/components/common/button/Button";

const EditorModule = dynamic(
  () => import("@/components/common/editor/EditorModule"),
  {
    ssr: false,
  }
);

function MustWriteForm() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const [imgUrl, setImgUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const editorRef = useRef<EditorProps>(null);
  const throttleRef = useRef(false);

  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>("선택");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const [error, setError] = useState({
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

  const { mutate: addMustPost } = useMutation({
    mutationFn: (newMustPost: TNewMustPost) => insertMustPost(newMustPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mustPosts", selectedCategory],
      });
      router.push("/mustpost");
      Notify.success("게시물이 등록되었습니다.");
    },
  });

  const { mutate: addImage } = useMutation({
    mutationFn: async (newMustPostImage: File) => {
      const formData = new FormData();
      formData.append("file", newMustPostImage);

      setLoading(true);
      const response = await insertMustImage(formData);
      setImgUrl(
        `https://wtgehzvyirdsifnqqfzn.supabase.co/storage/v1/object/public/mustposts/${response.path}`
      );
      setLoading(false);
    },
  });

  const addImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError((prev) => ({
      ...prev,
      imageUrlError: "",
    }));
    if (e.target.files) {
      const newMustPostImage = e.target.files[0];
      const fileType = newMustPostImage.type;

      if (newMustPostImage && !fileType.includes("image")) {
        Notify.failure("이미지 파일만 업로드 해주세요");
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(newMustPostImage, options);

      addImage(compressedFile);
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const startDate = `${year}-${month}-${day}` as string;

  const addMustPostBtn = async () => {
    if (throttleRef.current) return;
    const isValid = mustValidation(
      setError,
      title,
      selectedCategoryId,
      itemName,
      company,
      price,
      imgUrl
    );
    if (!isValid) {
      return;
    }
    if (!user) {
      router.push("/login");
      Notify.failure("로그인을 먼저 진행해주세요.");
      return;
    }

    if (editorRef.current) {
      const editorContent = editorRef.current.getInstance().getMarkdown();

      if (!editorContent) return Notify.failure("모든 항목을 입력해주세요");
      throttleRef.current = true;
      const newMustPost: TNewMustPost = {
        id: uuidv4(),
        user_id: user.id,
        title,
        category_id: selectedCategoryId,
        content: editorContent,
        img_url: imgUrl,
        item: itemName,
        location: company,
        price,
        link,
      };
      addMustPost(newMustPost);
    }
    setTimeout(() => {
      throttleRef.current = false;
    }, 5000);
  };

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
          <div className="flex flex-col md:flex-row gap-2 md:gap-[10px] items-start">
            <input
              className="hidden"
              id="image-file"
              type="file"
              accept="image/*"
              onChange={addImageHandler}
            />
            <label
              className="flex justify-center items-center shrink-0 ml-[72px] md:ml-[78px] w-[100px] aspect-square text-center font-bold text-base text-gray-4 bg-gray-1 cursor-pointer whitespace-pre-line rounded-lg"
              htmlFor="image-file"
            >
              {imgUrl ? `이미지\n수정` : `이미지\n업로드`}
            </label>

            {error.imageUrlError && (
              <p className={`text-red-3 text-[12px] mt-2`}>
                {error.imageUrlError}
              </p>
            )}
            <div className="w-[44px] md:w-auto aspect-square ml-[72px] md:ml-0 rounded-[4px]">
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
