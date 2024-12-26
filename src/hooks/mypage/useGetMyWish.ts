import { getMyWishMust } from "@/apis/mypage";
import { MyWishMust } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";

export function useGetMyWish() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: myWishMustLists = [],
    isPending,
    isError,
  } = useQuery<MyWishMust[]>({
    queryKey: ["wish", userId],
    queryFn: () => getMyWishMust(userId),
  });
  return { myWishMustLists, isPending, isError };
}
