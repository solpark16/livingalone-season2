import { deleteWish, getMyWish, getWishes, insertWish } from "@/apis/mustpost";
import { MustWish, TMustWishData } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Confirm } from "notiflix";
import { useEffect, useState } from "react";

export default function useWish(postId: string) {
  const queryClient = useQueryClient();
  const [isWish, setIsWish] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const router = useRouter();

  const { data: myWish } = useQuery<MustWish>({
    queryKey: ["myWish", postId, userId],
    queryFn: () => getMyWish(postId, userId),
    enabled: !!user,
  });

  useEffect(() => {
    if (myWish && myWish.post_id === postId) {
      setIsWish(true);
    } else {
      setIsWish(false);
    }
  }, [myWish, postId]);

  const {
    data: wishes = [],
    isPending,
    isError,
  } = useQuery<MustWish[]>({
    queryKey: ["wish", postId],
    queryFn: () => getWishes(postId),
    enabled: !!postId,
  });

  const wishesCount = wishes.length;

  const { mutate: addWish } = useMutation({
    mutationFn: (wishData: TMustWishData) => insertWish(wishData),
    onMutate: async (wishData: TMustWishData) => {
      await queryClient.cancelQueries({ queryKey: ["wish", postId] });

      const previousWishes = queryClient.getQueryData<MustWish[]>(["wish", postId]);

      queryClient.setQueryData<MustWish[]>(["wish", postId], (old) => [...(old || []), wishData as MustWish]);

      setIsWish(true);
      return { previousWishes };
    },
    onError: (err, wishData, context) => {
      queryClient.setQueryData(["wish", postId], context?.previousWishes);
      setIsWish(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wish"] });
    },
  });

  const { mutate: removeWish } = useMutation({
    mutationFn: (wishData: TMustWishData) => deleteWish(wishData),
    onMutate: async (wishData: TMustWishData) => {
      await queryClient.cancelQueries({ queryKey: ["wish", postId] });

      const previousWishes = queryClient.getQueryData<MustWish[]>(["wish", postId]);

      queryClient.setQueryData<MustWish[]>(["wish", postId], (old) =>
        old?.filter((wish) => !(wish.post_id === wishData.post_id && wish.user_id === wishData.user_id))
      );

      setIsWish(false);
      return { previousWishes };
    },
    onError: (err, wishData, context) => {
      queryClient.setQueryData(["wish", postId], context?.previousWishes);
      setIsWish(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wish", postId] });
    },
  });

  const handleToggleWish = () => {
    if (user) {
      const wishData: TMustWishData = {
        post_id: postId,
        user_id: user.id,
      };
      if (isWish) {
        removeWish(wishData);
      } else {
        addWish(wishData);
      }
    } else {
      Confirm.show(
        "로그인 후 이용 가능",
        "로그인하러 가시겠습니까?",
        "로그인 하기",
        "취소",
        () => {
          router.push("/login");
        },
        () => {
          return;
        }
      );
    }
  };

  return { isWish, wishesCount, handleToggleWish, isError, isPending, user };
}
