"use client";
import useWishCount from "@/hooks/common/useWishCount";
import useWishStatus from "@/hooks/common/useWishStatus";

interface WishCountProps {
  postId: string;
}

export function WishCount({ postId }: WishCountProps) {
  const { isWish } = useWishStatus(postId);
  const { wishesCount } = useWishCount(postId);

  return (
    <span className={`ml-[2px] text-[14px] ${isWish ? "text-main-7" : "text-gray-4"}`}>
      {wishesCount > 999 ? "999+" : wishesCount > 0 ? wishesCount : "0"}
    </span>
  );
}
