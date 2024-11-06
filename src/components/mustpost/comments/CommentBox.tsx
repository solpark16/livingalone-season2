import Image from "next/image";
import { comment } from "postcss";
import React from "react";
import CommentDeleteBtn from "./CommentDeleteBtn";

interface CommentBoxProps {
  profileImg: string;
  nickname: string;
  content: string;
  createdAt: string;
  commentId?: string;
  postId?: string;
  handleEditComment?: (commentId: string, content: string) => void;
}

function CommentBox({
  profileImg,
  nickname,
  content,
  createdAt,
  commentId,
  postId,
  handleEditComment,
}: CommentBoxProps) {
  console.log("ddd" + postId);
  return (
    <div className="gap-1 w-full text-gray-4 mb-5">
      <div className="flex items-center gap-[5px] mb-[10px]">
        <div className="relative flex-shrink-0 w-6 h-6">
          <Image
            src={profileImg}
            alt="프로필 이미지"
            fill
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col text-[13px] text-gray-6 font-semibold">
          <span>{nickname}</span>
        </div>
      </div>
      <p className="text-[14px] text-gray-6 whitespace-pre-wrap break-words text-justify leading-5 mb-[10px]">
        {content}
      </p>
      <div className="flex flex-row text-xs gap-1 text-gray-4">
        <span className="text-gray-4 text-xs">
          {createdAt.split("T").join(" ").substring(0, 16)}
        </span>
        ・
        {commentId && postId && (
          <>
            <button
              className="text-gray-4 text-xs"
              onClick={() =>
                handleEditComment && handleEditComment(commentId, content)
              }
            >
              수정
            </button>
            ・<CommentDeleteBtn commentId={commentId} postId={postId} />
          </>
        )}
      </div>
    </div>
  );
}

export default CommentBox;
