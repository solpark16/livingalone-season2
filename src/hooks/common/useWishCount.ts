// useWishCount.ts
import { getWishes } from "@/apis/mustpost";
import { MustWish } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export default function useWishCount(postId: string) {
  const { data: wishes = [] } = useQuery<MustWish[]>({
    queryKey: ["wish", postId],
    queryFn: () => getWishes(postId),
    enabled: !!postId,
  });

  const wishesCount = wishes.length;

  return { wishesCount };
}
