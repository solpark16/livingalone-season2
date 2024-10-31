"use client";
import useWishStatus from "@/hooks/common/useWishStatus";

interface WishButtonProps {
  postId: string;
}

export function WishButton({ postId }: WishButtonProps) {
  const { handleToggleWish, isWish } = useWishStatus(postId);

  return (
    <button
      className={`text-[13px] md:text-[14px] ${
        isWish ? "text-main-7" : "text-gray-4"
      }`}
      onClick={handleToggleWish}
    >
      <span>찜하기</span>
    </button>
  );
}
