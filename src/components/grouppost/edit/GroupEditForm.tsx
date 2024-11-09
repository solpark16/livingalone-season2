"use client";

import {
  getGroupPost,
  insertGroupImage,
  updateGroupPost,
} from "@/apis/grouppost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import EditorModule from "@/components/common/editor/EditorModule";
import InputField from "@/components/common/input/InputField";
import { useInputChange } from "@/hooks/common/useInput";
import { GroupPost, TNewGroupPost } from "@/types/types";
import { postRevalidate } from "@/utils/revalidate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditorProps } from "@toast-ui/react-editor";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useEffect, useRef, useState } from "react";
import GroupPostNotice from "../common/GroupPostNotice";
import { groupValidation } from "../common/GroupValidation";

import imageCompression from "browser-image-compression";
import Button from "@/components/common/button/Button";
import IsLoading from "@/components/common/loading/IsLoading";
import Error from "@/components/common/error/Error";
import Input from "@/components/common/input/Input";
import AddImage from "@/components/common/input/AddImage";

function GroupEditForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [checkBox, setCheckBox] = useState(false);
  const editorRef = useRef<EditorProps>(null);
  const throttleRef = useRef(false);

  const [error, setError] = useState({
    titleError: "",
    endDateError: "",
    peopleNumError: "",
    itemError: "",
    priceError: "",
    imageUrlError: "",
  });

  const {
    data: groupPost,
    isPending,
    isError,
  } = useQuery<GroupPost>({
    queryKey: ["editGroupPost", id],
    queryFn: () => getGroupPost(id),
  });
  const [imgUrl, setImgUrl] = useState<string>("");

  const {
    values: input,
    handler: onChangeInput,
    setValueInit,
  } = useInputChange({
    title: "",
    startDate: "",
    endDate: "",
    content: "",
    item: "",
    link: "",
    peopleNum: 0,
    price: 0,
    userId: "",
    isFinished: false,
    regularPrice: 0,
  });
  const {
    title,
    startDate,
    endDate,
    content,
    item,
    link,
    peopleNum,
    price,
    userId,
    isFinished,
    regularPrice,
  } = input;
  useEffect(() => {
    if (groupPost) {
      setValueInit({
        title: groupPost.title,
        startDate: groupPost.start_date,
        endDate: groupPost.end_date,
        content: groupPost.content,
        item: groupPost.item,
        link: groupPost.link ? groupPost.link : "",
        peopleNum: groupPost.people_num,
        price: groupPost.price,
        userId: groupPost.user_id,
        isFinished: groupPost.is_finished,
      });
      setImgUrl(groupPost.img_url);

      if (editorRef.current) {
        editorRef.current.getInstance().setMarkdown(groupPost.content);
      }
    }
  }, [groupPost, editorRef.current]);

  const addImageMutation = useMutation({
    mutationFn: async (newGroupImage: File) => {
      const formData = new FormData();
      formData.append("file", newGroupImage);
      const response = await insertGroupImage(formData);
      setImgUrl(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/groupposts/${response.path}`
      );
    },
  });

  const addImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const newGroupImage = e.target.files[0];
      const fileType = newGroupImage.type;

      if (newGroupImage && !fileType.includes("image")) {
        Notify.failure("이미지 파일만 업로드 해주세요");
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(newGroupImage, options);

      addImageMutation.mutate(compressedFile);
    }
  };

  const updateMutation = useMutation({
    mutationFn: async (newGroupPost: TNewGroupPost) => {
      await updateGroupPost(newGroupPost);
    },
    onSuccess: async () => {
      Notify.success("공구템 수정이 완료되었습니다!");
      postRevalidate(`/grouppost/read/${id}`);
      router.push(`/grouppost/read/${id}`);
      router.refresh();
    },
  });

  const editGroupPostHandler = async () => {
    if (throttleRef.current) return;
    const isValid = groupValidation(
      setError,
      title,
      endDate,
      peopleNum,
      item,
      price,
      imgUrl
    );
    if (!isValid) {
      return;
    }

    if (editorRef.current) {
      const editorContent = editorRef.current.getInstance().getMarkdown();

      if (!editorContent) return Notify.failure("모든 항목을 입력해주세요");
      throttleRef.current = true;
      const newGroupPost: TNewGroupPost = {
        id,
        user_id: userId,
        title,
        start_date: startDate,
        end_date: endDate,
        people_num: +peopleNum,
        price,
        content: editorContent,
        item,
        link,
        img_url: imgUrl,
        is_finished: isFinished,
        is_free: false,
        regular_price: regularPrice,
      };
      updateMutation.mutate(newGroupPost);
    }
    setTimeout(() => {
      throttleRef.current = false;
    }, 5000);
  };

  if (isPending) return <IsLoading />;

  if (isError) return <Error />;

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
        />
        <Input
          name="regularPrice"
          labelName="판매가격"
          value={regularPrice || ""}
          type="number"
          placeholder="사이트에서 판매되고 있는 가격을 입력해주세요."
          onChange={onChangeInput}
        />
        <Input
          name="link"
          labelName="상품링크"
          value={link}
          type="text"
          placeholder="(선택사항) 상품소개 페이지 링크를 넣어주세요."
          onChange={onChangeInput}
        />
        <AddImage
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
          onClick={editGroupPostHandler}
        />
      </div>
    </InnerLayout>
  );
}

export default GroupEditForm;
