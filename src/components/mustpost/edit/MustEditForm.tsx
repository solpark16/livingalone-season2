"use client";
import { getMustPost, updateMustPost } from "@/apis/mustpost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import EditorModule from "@/components/common/editor/EditorModule";
import { useInputChange } from "@/hooks/common/useInput";
import {
  MustCategory,
  MustPost,
  TMustError,
  TNewMustPost,
} from "@/types/types";
import { postRevalidate } from "@/utils/revalidate";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditorProps } from "@toast-ui/react-editor";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { mustValidation } from "../common/MustValidation";
import SelectCategory from "../write/SelectCategory";

import Input from "@/components/common/input/Input";
import Button from "@/components/common/button/Button";
import IsLoading from "@/components/common/loading/IsLoading";
import ImageUploader from "@/components/common/input/ImageUploader";
import Error from "@/components/common/error/Error";

type TMustPost = MustPost & {
  must_categories: { id: string; name: string };
};

function MustEditForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const router = useRouter();

  const editorRef = useRef<EditorProps>(null);
  const throttleRef = useRef(false);

  const [imgUrl, setImgUrl] = useState<string>("");

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

  const {
    values: input,
    handler: onChangeInput,
    setValueInit,
  } = useInputChange({
    title: "",
    itemName: "",
    company: "",
    price: 0,
    link: "",
  });
  const { title, itemName, company, price, link } = input;

  const {
    data: mustPost,
    isPending,
    isError,
  } = useQuery<TMustPost>({
    queryKey: ["editMustPost", id],
    queryFn: () => getMustPost(id),
  });

  useEffect(() => {
    if (mustPost && editorRef.current) {
      setValueInit({
        title: mustPost.title,
        itemName: mustPost.item,
        company: mustPost.location,
        price: mustPost.price,
        link: mustPost.link || "",
      });
      setSelectedCategoryName(mustPost.must_categories.name);
      setSelectedCategoryId(mustPost.must_categories.id);
      setImgUrl(mustPost.img_url);

      editorRef.current.getInstance().setMarkdown(mustPost.content);
    }
  }, [mustPost, editorRef.current]);

  const selectCategory = useCallback((category: MustCategory) => {
    setSelectedCategoryName(category.name);
    setSelectedCategoryId(category.id);
  }, []);

  const updateMutation = useMutation({
    mutationFn: async (newMustPost: TNewMustPost) => {
      await updateMustPost(newMustPost);
    },
    onSuccess: () => {
      postRevalidate(`/mustpost/read/${id}`);
      router.push(`/mustpost/read/${id}`);
      router.refresh();
      Notify.success("게시물 수정이 완료되었습니다.");
    },
  });

  const addMustPostHandler = () => {
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

    if (!userId) {
      router.push("/login");
      Notify.failure("로그인을 먼저 진행해주세요.");
      return;
    }

    if (editorRef.current) {
      const editorContent = editorRef.current.getInstance().getMarkdown();

      if (!editorContent) return Notify.failure("모든 항목을 입력해주세요");
      throttleRef.current = true;
      const newMustPost: TNewMustPost = {
        id,
        user_id: userId,
        title,
        category_id: selectedCategoryId,
        content: editorContent,
        img_url: imgUrl,
        item: itemName,
        location: company,
        price,
        link,
      };
      updateMutation.mutate(newMustPost);
    }
    setTimeout(() => {
      throttleRef.current = false;
    }, 5000);
  };

  if (isPending) return <IsLoading />;

  if (isError) return <Error />;

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
            onClick={addMustPostHandler}
          />
        </div>
      </div>
    </InnerLayout>
  );
}

export default MustEditForm;
