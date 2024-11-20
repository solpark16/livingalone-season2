import { insertGroupPost } from "@/apis/grouppost";
import { insertMustPost } from "@/apis/mustpost";
import { groupValidation } from "@/components/grouppost/common/GroupValidation";
import { mustValidation } from "@/components/mustpost/common/MustValidation";
import { START_DATE } from "@/constants/date";
import { TGroupError, TMustError } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditorProps } from "@toast-ui/react-editor";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface BasePostData<ErrorType> {
  title: string;
  imgUrl: string;
  editorRef: EditorProps;
  setError: React.Dispatch<React.SetStateAction<ErrorType>>;
  link: string;
  price: number;
  item: string;
}

interface MustPostData extends BasePostData<TMustError> {
  selectedCategoryId: string;
  company: string;
  itemName: string;
}

interface GroupPostData extends BasePostData<TGroupError> {
  endDate: string;
  peopleNum: number;
  regularPrice: number;
  checkBox: boolean;
  isFree: boolean;
}

// API 응답 타입
interface MustPostResponse {
  id: string;
  user_id: string;
  title: string;
  category_id: string;
  content: string;
  img_url: string;
  item: string;
  location: string;
  price: number;
  link: string;
}

interface GroupPostResponse {
  id: string;
  user_id: string;
  title: string;
  end_date: string;
  people_num: number;
  price: number;
  regular_price: number;
  content: string;
  item: string;
  link: string;
  img_url: string;
  is_free: boolean;
  is_finished: boolean;
  start_date: string;
}

type PostType = "must" | "group";
type PostResponseType<T extends PostType> = T extends "must"
  ? MustPostResponse
  : GroupPostResponse;

export function usePostSubmit<T extends PostType>(
  postData: T extends "must"
    ? MustPostData & {
        setError: React.Dispatch<React.SetStateAction<TMustError>>;
      }
    : GroupPostData & {
        setError: React.Dispatch<React.SetStateAction<TGroupError>>;
      },
  postType: T
) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const throttleRef = useRef(false);

  const { mutate: addPost } = useMutation({
    mutationFn: (newPost: PostResponseType<T>) =>
      postType === "must"
        ? insertMustPost(newPost as MustPostResponse)
        : insertGroupPost(newPost as GroupPostResponse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${postType}Posts`] });
      router.push(`/${postType}post`);
      Notify.success("게시물이 등록되었습니다.");
    },
  });

  const addPostHandler = async () => {
    if (throttleRef.current) return;

    const isValid =
      postType === "must"
        ? mustValidation(
            (postData as MustPostData).setError,
            postData.title,
            (postData as MustPostData).selectedCategoryId,
            (postData as MustPostData).itemName,
            (postData as MustPostData).company,
            postData.price,
            postData.imgUrl
          )
        : groupValidation(
            (postData as GroupPostData).setError,
            postData.title,
            (postData as GroupPostData).endDate,
            (postData as GroupPostData).peopleNum,
            postData.item,
            postData.price,
            postData.imgUrl,
            (postData as GroupPostData).regularPrice
          );

    if (!isValid || !user) {
      Notify.failure("모든 항목을 확인해주세요.");
      return;
    }

    if (postType === "group" && "checkBox" in postData && !postData.checkBox) {
      Notify.failure("체크박스를 체크해주세요.");
      return;
    }

    if (postData.editorRef.current) {
      const editorContent = postData.editorRef.current
        .getInstance()
        .getMarkdown();

      if (!editorContent) {
        Notify.failure("모든 항목을 입력해주세요");
        return;
      }

      throttleRef.current = true;

      const newPost: PostResponseType<T> =
        postType === "must"
          ? ({
              id: uuidv4(),
              user_id: user.id,
              title: postData.title,
              category_id: (postData as MustPostData).selectedCategoryId,
              content: editorContent,
              img_url: postData.imgUrl,
              item: (postData as MustPostData).itemName,
              location: (postData as MustPostData).company,
              price: postData.price,
              link: postData.link,
            } as PostResponseType<T>)
          : ({
              id: uuidv4(),
              user_id: user.id,
              title: postData.title,
              end_date: (postData as GroupPostData).endDate,
              people_num: (postData as GroupPostData).peopleNum,
              price: postData.price,
              regular_price: (postData as GroupPostData).regularPrice,
              content: editorContent,
              item: postData.item,
              link: postData.link,
              img_url: postData.imgUrl,
              is_free: (postData as GroupPostData).isFree,
              is_finished: false,
              start_date: START_DATE,
            } as PostResponseType<T>);

      addPost(newPost);

      setTimeout(() => {
        throttleRef.current = false;
      }, 5000);
    }
  };

  return { addPostHandler };
}
