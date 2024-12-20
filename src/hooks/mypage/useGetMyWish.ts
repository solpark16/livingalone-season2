import { getMyWishMust } from "@/apis/mypage";
import { TMustWishData } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";

export function useGetMyWish() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: myWishMustLists = [],
    isPending,
    isError,
  } = useQuery<TMustWishData[]>({
    queryKey: ["wish", userId],
    queryFn: () => getMyWishMust(userId),
  });
  return { myWishMustLists, isPending, isError };
}
