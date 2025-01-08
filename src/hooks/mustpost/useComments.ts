import { getComments, getCommentsCount } from "@/apis/mustpost";
import { useQuery } from "@tanstack/react-query";

export function useGetComments(postId: string, page?: number) {
  const { data: commentsData, isPending } = useQuery({
    queryKey: ["comments", postId, page],
    queryFn: () =>
      !page ? getCommentsCount(postId) : getComments(postId, page),
  });

  return { commentsData, isPending };
}
