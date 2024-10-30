"use client";
import useWishStatus from "@/hooks/common/useWishStatus";
import { useRouter } from "next/navigation";
import { Confirm } from "notiflix";

interface WishButtonProps {
  postId: string;
}

export function WishButton({ postId }: WishButtonProps) {
  const { isWish, addWish, removeWish, user } = useWishStatus(postId);
  const router = useRouter();

  const handleToggleWish = () => {
    if (user) {
      const wishData = { post_id: postId, user_id: user.id };
      isWish ? removeWish(wishData) : addWish(wishData);
    } else {
      Confirm.show("로그인 후 이용 가능", "로그인하러 가시겠습니까?", "로그인 하기", "취소", () => {
        router.push("/login");
      });
    }
  };

  return (
    <button className={`text-[14px] ${isWish ? "text-main-7" : "text-gray-4"}`} onClick={handleToggleWish}>
      <span>찜하기</span>
    </button>
  );
}
