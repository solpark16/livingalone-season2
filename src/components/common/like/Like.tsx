"use client";
import useLike from "@/hooks/common/useLike";
import Image from "next/image";

interface LikeProps {
  postId: string;
}

function Like({ postId }: LikeProps) {
  const { isLike, handleToggleLike, isPending, isError, user } = useLike(postId);

  if (!user)
    return (
      <button onClick={handleToggleLike}>
        <Image src="/img/icon-like.svg" alt="좋아요 버튼" width={20} height={20} />
      </button>
    );

  if (isPending) return <div className="rounded-full w-[55px] h-[30px] animate-pulse"></div>;

  if (isError) return <span>에러</span>;

  return (
    <button onClick={handleToggleLike}>
      {isLike ? (
        <Image src="/img/icon-like-on.svg" alt="좋아요 버튼" width={18} height={18} />
      ) : (
        <Image src="/img/icon-like.svg" alt="좋아요 버튼" width={18} height={18} />
      )}
    </button>
  );
}

export default Like;
