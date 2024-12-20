// useWishStatus.ts
import { deleteWish, getMyWish, insertWish } from "@/apis/mustpost";
import { MustWish, TMustWishData } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Confirm } from "notiflix";
import { useEffect, useState } from "react";

export default function useWishStatus(postId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isWish, setIsWish] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const { data: myWish } = useQuery<MustWish>({
    queryKey: ["myWish", postId, userId],
    queryFn: () => getMyWish(postId, userId),
    enabled: !!user,
  });

  useEffect(() => {
    setIsWish(!!(myWish && myWish.post_id === postId));
  }, [myWish, postId]);

  const { mutate: addWish } = useMutation({
    mutationFn: (wishData: TMustWishData) => insertWish(wishData),
    onMutate: async () => {
      setIsWish(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myWish", postId, userId] });
      queryClient.invalidateQueries({ queryKey: ["wish", postId] });
    },
  });

  const { mutate: removeWish } = useMutation({
    mutationFn: (wishData: TMustWishData) => deleteWish(wishData),
    onMutate: async () => {
      setIsWish(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myWish", postId, userId] });
      queryClient.invalidateQueries({ queryKey: ["wish", postId] });
    },
  });

  const handleToggleWish = () => {
    if (user) {
      const wishData = { post_id: postId, user_id: user.id };
      isWish ? removeWish(wishData) : addWish(wishData);
    } else {
      Confirm.show(
        "로그인 후 이용 가능",
        "로그인하러 가시겠습니까?",
        "로그인 하기",
        "취소",
        () => {
          router.push("/login");
        }
      );
    }
  };

  return { handleToggleWish, isWish, addWish, removeWish, user };
}
