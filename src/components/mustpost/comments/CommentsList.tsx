"use client";
import { getComments, updatenewComment } from "@/apis/mustpost";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useState } from "react";
import CommentDeleteBtn from "./CommentDeleteBtn";
import CommentBox from "./CommentBox";
import { MustComments } from "@/types/types";
import Button from "@/components/common/button/Button";

export type TEditComment = {
  commentId: string | null;
  content: string;
};

function CommentsList({ postId }: { postId: string }) {
  const [editComment, setEditComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [page, setPage] = useState(1);

  const { data: commentsData, isPending } = useQuery({
    queryKey: ["comments", postId, page],
    queryFn: () => getComments(postId, page),
  });
  const comments = commentsData?.data || [];
  const totalComments = commentsData?.count || 0;
  const totalPages = Math.ceil(totalComments / commentsData?.limit);

  const { mutate: updateComment } = useMutation({
    mutationFn: (newEditComment: TEditComment) =>
      updatenewComment(newEditComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleEditComment = (commentId: string, content: string) => {
    setEditCommentId(commentId);
    setEditComment(content);
  };

  const handleUpdateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editComment.trim()) {
      Notify.warning("댓글을 입력해주세요");
      return;
    }
    if (!user) {
      Notify.failure("로그인을 먼저 진행해주세요.");
      router.push("/login");
      return;
    }
    const newEditComment: TEditComment = {
      commentId: editCommentId,
      content: editComment,
    };

    updateComment(newEditComment);
    setEditCommentId(null);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="relative w-[100px] h-[100px] md:w-[200px] md:h-[200px] flex justify-center items-center">
          <Image src="/img/loading-spinner-transparent.svg" alt="로딩중" fill />
        </div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center pt-[23px] pb-[16px]">
        <div className="relative w-[67px] md:w-[100px] h-[62px] md:h-[94px] mb-5">
          <Image src="/img/icon-empty.png" alt="empty" layout="fill" />
        </div>
        <span className="text-gray-2 text-[16px] mb-1">댓글이 없습니다.</span>
        <span className="text-gray-2 text-[16px]">
          첫 댓글을 작성해 보세요!
        </span>
      </div>
    );
  }

  return (
    <div>
      {comments &&
        comments.map((comment: MustComments) => (
          <div key={comment.id}>
            {user?.id === comment.user_id ? (
              // 댓글 작성자와 아이디가 같은 유저일 경우
              <div>
                {editCommentId === comment.id ? (
                  // 수정 모드
                  <div className=" w-full p-3 border border-gray-2 rounded-lg mb-5">
                    <div className="flex">
                      <div className="flex-shrink-0 relative mr-1 w-6 h-6">
                        <Image
                          src={comment.profiles.profile_image_url}
                          alt="유저 프로필 사진"
                          fill
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <span className="inline-block font-semibold mb-1 text-gray-6 h-4 text-[13px]">
                          {comment.profiles.nickname}
                        </span>
                      </div>
                    </div>
                    <form onSubmit={handleUpdateComment} className="mt-[5px]">
                      <div className="flex flex-col">
                        <textarea
                          value={editComment}
                          cols={30}
                          rows={2}
                          maxLength={501}
                          autoFocus={false}
                          onChange={(e) => setEditComment(e.target.value)}
                          className="w-full h-[45px] text-[14px] rounded-[4px] resize-none outline-none flex-grow-1"
                        ></textarea>
                      </div>

                      <div className="flex flex-row justify-center items-center gap-1 w-[72px] mt-[9px] md:ml-auto flex-grow-0">
                        {/* <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="w-[34px] py-[3px] border text-[12px] text-gray-3 bg-gray-6 rounded-[4px]"
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          className="w-[34px] py-[3px] text-[12px] text-gray-1 rounded-[4px] bg-main-8"
                        >
                          완료
                        </button> */}
                        <Button
                          onClick={handleCancelEdit}
                          bgColor="bg-main-7"
                          textColor="text-white"
                          size="sm"
                          content="취소"
                        />
                        <Button
                          bgColor="bg-main-7"
                          textColor="text-white"
                          size="sm"
                          content="완료"
                        />
                      </div>
                    </form>
                  </div>
                ) : (
                  // 읽기 모드
                  <div className="mb-5">
                    <CommentBox
                      profileImg={comment.profiles.profile_image_url}
                      nickname={comment.profiles.nickname}
                      content={comment.content}
                    />
                    <div className="flex flex-row text-xs gap-1 mt-1 md:mt-0 mb-3 md:mb-0 ml-9 md:ml-0 text-gray-4">
                      <span className="text-gray-4 text-xs">
                        {comment.created_at
                          .split("T")
                          .join(" ")
                          .substring(0, 16)}
                      </span>
                      ・
                      <button
                        className="text-gray-4 text-xs"
                        onClick={(e) =>
                          handleEditComment(comment.id, comment.content)
                        }
                      >
                        수정
                      </button>
                      ・
                      <CommentDeleteBtn
                        commentId={comment.id}
                        postId={postId}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // 댓글 작성자와 아이디가 다른 유저일 경우
              <div className="mb-5">
                <CommentBox
                  profileImg={comment.profiles.profile_image_url}
                  nickname={comment.profiles.nickname}
                  content={comment.content}
                />
                <span className="text-gray-4 text-xs">
                  {comment.created_at.split("T").join(" ").substring(0, 16)}
                </span>
              </div>
            )}
          </div>
        ))}
      <div className="flex justify-center pt-[50px] gap-2">
        {[...Array(totalPages)].map((_, index) => {
          return (
            <button
              className={`w-5 h-5 border-[1px] flex justify-center items-center text-[12px] rounded-[4px] font-semibold
              ${
                page === index + 1
                  ? "text-main-7 border-main-7"
                  : "text-gray-4 border-gray-4"
              }`}
              key={index + 1}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CommentsList;
