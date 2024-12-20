import { getMyProfile } from "@/apis/mypage";
import { Profile } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useGetProfile(userId: string) {
  const {
    data: prevProfile,
    isPending,
    isError,
  } = useQuery<Profile>({
    queryKey: ["profile", userId],
    queryFn: () => getMyProfile(userId),
  });
  return { prevProfile, isPending, isError };
}
