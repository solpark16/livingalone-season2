import { useAuthStore } from "@/zustand/authStore";
import { useCategoryStore } from "@/zustand/mustStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import React, { useRef, useState } from "react";
import { useInputChange } from "../common/useInput";
import { MustCategory, TNewMustPost } from "@/types/types";
import { insertMustImage, insertMustPost } from "@/apis/mustpost";
import { Notify } from "notiflix";
import imageCompression from "browser-image-compression";
import { mustValidation } from "@/components/mustpost/common/MustValidation";
import { v4 as uuidv4 } from "uuid";
import { EditorProps } from "@toast-ui/react-editor";
import { useRouter } from "next/navigation";

export function usePostSubmit() {
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

  const addMustPostHandler = async () => {
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

  return {
    addMustPostHandler: addMustPostHandler,
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
  };
}
