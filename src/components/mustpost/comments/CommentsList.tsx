"use client";
import { updatenewComment } from "@/apis/mustpost";
import { useGetComments } from "@/hooks/mustpost/useComments";
import { MustComments } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import { useState } from "react";
import CommentBox from "./CommentBox";
import CommentEdit from "./CommentEdit";
import CommentZero from "./CommentZero";
import CommentsPagination from "./CommentsPagination";
import SkeletonComments from "./SkeletonComments";

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

  const { commentsData, isPending } = useGetComments(postId, page);

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

  if (isPending || !postId) {
    return <SkeletonComments />;
  }

  if (comments.length === 0) {
    return <CommentZero />;
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
                  <CommentEdit
                    profileImg={comment.profiles.profile_image_url}
                    nickname={comment.profiles.nickname}
                    handleUpdateComment={handleUpdateComment}
                    editComment={editComment}
                    setEditComment={setEditComment}
                    handleCancelEdit={handleCancelEdit}
                  />
                ) : (
                  // 읽기 모드
                  <CommentBox
                    profileImg={comment.profiles.profile_image_url}
                    nickname={comment.profiles.nickname}
                    content={comment.content}
                    createdAt={comment.created_at}
                    commentId={comment.id}
                    postId={postId}
                    setEditCommentId={setEditCommentId}
                    setEditComment={setEditComment}
                  />
                )}
              </div>
            ) : (
              // 댓글 작성자와 아이디가 다른 유저일 경우
              <CommentBox
                profileImg={comment.profiles.profile_image_url}
                nickname={comment.profiles.nickname}
                content={comment.content}
                createdAt={comment.created_at}
              />
            )}
          </div>
        ))}
      <CommentsPagination
        totalPages={totalPages}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default CommentsList;
