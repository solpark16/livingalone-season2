import Image from "next/image";
import { comment } from "postcss";
import React from "react";
import CommentDeleteBtn from "./CommentDeleteBtn";
import CommentProfile from "./CommentProfile";

interface CommentBoxProps {
  profileImg: string;
  nickname: string;
  content: string;
  createdAt: string;
  commentId?: string;
  postId?: string;
  setEditCommentId?: React.Dispatch<React.SetStateAction<string | null>>;
  setEditComment?: React.Dispatch<React.SetStateAction<string>>;
}

function CommentBox({
  profileImg,
  nickname,
  content,
  createdAt,
  commentId,
  postId,
  setEditCommentId,
  setEditComment,
}: CommentBoxProps) {
  const handleEditComment = (commentId: string, content: string) => {
    if (setEditCommentId && setEditComment) {
      setEditCommentId(commentId);
      setEditComment(content);
    }
  };
  return (
    <div className="gap-1 w-full text-gray-4 mb-5">
      <CommentProfile profileImg={profileImg} nickname={nickname} />

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
