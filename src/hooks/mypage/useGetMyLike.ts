import { getMyLikeGroup } from "@/apis/mypage";
import { TLikePosts } from "@/types/types";

import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";

export function useGetMyLike() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: myLikeGroupPosts = [],
    isPending,
    isError,
  } = useQuery<TLikePosts[]>({
    queryKey: ["myLikeGroupList", userId],
    queryFn: () => getMyLikeGroup(userId),
  });

  return { myLikeGroupPosts, isPending, isError };
}
