"use client";
import { deleteWish, getMyWish, insertWish } from "@/apis/mustpost";
import { MustWish, TMustWishData } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Report } from "notiflix";
import { useEffect, useState } from "react";

interface WishProps {
  postId: string;
}

function Wish({ postId }: WishProps) {
  const queryClient = useQueryClient();
  const [isWish, setIsWish] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const userId = user?.id as string;

  const {
    data: myWish,
    isPending,
    isError,
  } = useQuery<MustWish>({
    queryKey: ["wish", postId, userId],
    queryFn: () => getMyWish(userId, postId),
    enabled: !!user,
  });

  useEffect(() => {
    if (myWish && myWish.post_id === postId) {
      setIsWish(true);
    } else {
      setIsWish(false);
    }
  }, [myWish, postId]);

  const { mutate: addWish } = useMutation({
    mutationFn: (wishData: TMustWishData) => insertWish(wishData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wish", postId, userId] });
    },
  });

  const { mutate: removeWish } = useMutation({
    mutationFn: (wishData: TMustWishData) => deleteWish(wishData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wish", postId, userId] });
    },
  });

  const handleToggleWish = () => {
    if (user) {
      const wishData: TMustWishData = {
        post_id: postId,
        user_id: user.id,
      };
      setIsWish((prev) => !prev);
      isWish ? removeWish(wishData) : addWish(wishData);
    } else {
      Report.failure("로그인 후 진행할 수 있습니다", "", "확인");
      router.push("/login");
    }
  };

  if (isPending) return <div>불러오는 중...</div>;
  if (isError) return <div>에러</div>;

  return (
    <button onClick={handleToggleWish} className="flex justify-center items-center">
      {isWish ? (
        <Image src="/img/icon-wish-on.png" alt="찜하기 버튼" width={20} height={20} />
      ) : (
        <Image src="/img/icon-wish.png" alt="찜하기 버튼" width={20} height={20} />
      )}
    </button>
  );
}

export default Wish;
