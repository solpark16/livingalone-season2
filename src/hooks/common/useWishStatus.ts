// useWishStatus.ts
import { deleteWish, getMyWish, insertWish } from "@/apis/mustpost";
import { MustWish, TMustWishData } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useWishStatus(postId: string) {
  const queryClient = useQueryClient();
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

  return { isWish, addWish, removeWish, user };
}
