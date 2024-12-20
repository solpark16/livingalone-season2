// import { updateGroupPost } from "@/apis/grouppost"; // Group 업데이트 API
// import { updateMustPost } from "@/apis/mustpost"; // Must 업데이트 API
// import { groupValidation } from "@/components/grouppost/common/GroupValidation";
// import { mustValidation } from "@/components/mustpost/common/MustValidation";
// import {
//   GroupPostData,
//   MustPostData,
//   PostResponseType,
//   PostType,
//   TGroupError,
//   TMustError,
// } from "@/types/types";
// import { useAuthStore } from "@/zustand/authStore";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { Notify } from "notiflix";
// import { useRef } from "react";

// type UsePostUpdateData<TError> = {
//   id: string; // id 추가
//   title: string;
//   imgUrl: string;
//   setError: React.Dispatch<React.SetStateAction<TError>>;
//   editorRef: React.RefObject<any>;
//   // MustEditForm과 GroupEditForm의 추가적인 속성을 포함
// } & (TError extends TMustError
//   ? { selectedCategoryId: string; itemName: string; company: string; price: number; link: string }
//   : { endDate: string; item: string; peopleNum: number; price: number; regularPrice: number; link: string });

// export function usePostUpdate<T extends PostType>(
//   postData: UsePostUpdateData<T extends "must" ? TMustError : TGroupError>,
//   postType: T
// ) {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const user = useAuthStore((state) => state.user);
//   const throttleRef = useRef(false);

//   const { mutate: updatePost } = useMutation({
//     mutationFn: (updatedPost: PostResponseType<T>) =>
//       postType === "must"
//         ? updateMustPost(updatedPost as MustPostData)
//         : updateGroupPost(updatedPost as GroupPostData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [`${postType}Posts`] });
//       router.push(`/${postType}post`);
//       Notify.success("게시물이 수정되었습니다.");
//     },
//   });

//   const updatePostHandler = async () => {
//     if (throttleRef.current) return;

//     const isValid =
//       postType === "must"
//         ? mustValidation(
//             (postData as MustPostData).setError,
//             postData.title,
//             (postData as MustPostData).selectedCategoryId,
//             (postData as MustPostData).itemName,
//             (postData as MustPostData).company,
//             postData.price,
//             postData.imgUrl
//           )
//         : groupValidation(
//             (postData as GroupPostData).setError,
//             postData.title,
//             (postData as GroupPostData).endDate,
//             (postData as GroupPostData).peopleNum,
//             postData.item,
//             postData.price,
//             postData.imgUrl,
//             (postData as GroupPostData).regularPrice
//           );

//     if (!isValid || !user) {
//       Notify.failure("모든 항목을 확인해주세요.");
//       return;
//     }

//     if (postData.editorRef.current) {
//       const editorContent = postData.editorRef.current
//         .getInstance()
//         .getMarkdown();

//       if (!editorContent) {
//         Notify.failure("모든 항목을 입력해주세요.");
//         return;
//       }

//       throttleRef.current = true;

//       const updatedPost: PostResponseType<T> =
//         postType === "must"
//           ? ({
//               id: postData.id, // 업데이트의 경우 기존 ID 유지
//               user_id: user.id,
//               title: postData.title,
//               category_id: (postData as MustPostData).selectedCategoryId,
//               content: editorContent,
//               img_url: postData.imgUrl,
//               item: (postData as MustPostData).itemName,
//               location: (postData as MustPostData).company,
//               price: postData.price,
//               link: postData.link,
//             } as PostResponseType<T>)
//           : ({
//               id: postData.id, // 업데이트의 경우 기존 ID 유지
//               user_id: user.id,
//               title: postData.title,
//               end_date: (postData as GroupPostData).endDate,
//               people_num: (postData as GroupPostData).peopleNum,
//               price: postData.price,
//               regular_price: (postData as GroupPostData).regularPrice,
//               content: editorContent,
//               item: postData.item,
//               link: postData.link,
//               img_url: postData.imgUrl,
//               is_free: (postData as GroupPostData).isFree,
//               is_finished: (postData as GroupPostData).isFinished,
//               start_date: (postData as GroupPostData).startDate,
//             } as PostResponseType<T>);

//       updatePost(updatedPost);

//       setTimeout(() => {
//         throttleRef.current = false;
//       }, 5000);
//     }
//   };

//   return { updatePostHandler };
// }
