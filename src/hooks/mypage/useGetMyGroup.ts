import { getMyGroup } from "@/apis/mypage";
import { TMainGroupPost } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";

export function useGetMyGroup() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const {
    data: myGroupPosts = [],
    isPending,
    isError,
  } = useQuery<TMainGroupPost[]>({
    queryKey: ["myGroup", userId],
    queryFn: () => getMyGroup(userId),
  });

  return { myGroupPosts, isPending, isError };
}
