import { getMyApplyGroup } from "@/apis/mypage";
import { TGroupApplicationData } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";

export function useGetMyApplyGroup() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: myApplyGroupPosts = [],
    isPending,
    isError,
  } = useQuery<TGroupApplicationData[]>({
    queryKey: ["myApplyGroupList", userId],
    queryFn: () => getMyApplyGroup(userId),
  });
  return {
    myApplyGroupPosts,
    isPending,
    isError,
  };
}
