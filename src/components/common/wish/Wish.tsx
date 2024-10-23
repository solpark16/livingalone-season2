"use client";

import useWish from "@/hooks/common/useWish";

interface WishProps {
  postId: string;
}

function Wish({ postId }: WishProps) {
  const { isWish, wishesCount, handleToggleWish, isError, isPending, user } = useWish(postId);

  if (!user) return <span className="text-[14px] text-gray-4">찜하기</span>;

  if (isPending) return null;

  if (isError) return <div>오류</div>;

  return (
    <button className={`text-[14px] ${isWish ? "text-main-7" : "text-gray-4"}`} onClick={handleToggleWish}>
      <span>찜하기</span>
      <span className="ml-[2px]">{wishesCount > 999 ? "999+" : wishesCount > 0 ? wishesCount : "0"}</span>
    </button>
  );
}

export default Wish;
