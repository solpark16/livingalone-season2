import { getGroupPosts } from "@/apis/grouppost";
import { useIsFinished } from "@/zustand/groupStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

export default function useGroupPostsFetch() {
  const isFinished = useIsFinished((state) => state.isFinished);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } = useInfiniteQuery({
    queryKey: ["groupPosts", isFinished],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getGroupPosts(pageParam, isFinished);
      return {
        posts: response.posts,
        total: response.total,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((acc, page) => acc + page.posts.length, 0);
      if (totalFetched >= lastPage.total) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });

  const { ref: observerRef, inView } = useInView({
    threshold: 1,
  });

  const groupPosts = useMemo(() => data?.pages?.flatMap((page) => page.posts) || [], [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return { isFinished, groupPosts, isFetchingNextPage, observerRef, isPending, isError };
}
