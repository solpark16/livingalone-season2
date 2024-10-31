"use client";
import useWishCount from "@/hooks/common/useWishCount";

interface WishCountProps {
  postId: string;
}

export function WishCount({ postId }: WishCountProps) {
  const { wishesCount } = useWishCount(postId);

  return (
    <span className="ml-[2px] text-[14px] text-gray-4">
      찜 {wishesCount > 999 ? "999+" : wishesCount > 0 ? wishesCount : "0"}
    </span>
  );
}
