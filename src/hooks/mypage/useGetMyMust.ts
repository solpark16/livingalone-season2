import { getMyMustPosts } from "@/apis/mypage";
import { useAuthStore } from "@/zustand/authStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

export function useGetMyMust() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["mustPosts", userId],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getMyMustPosts(pageParam, userId);
      return {
        posts: response.posts,
        total: response.total,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (acc, page) => acc + page.posts.length,
        0
      );
      if (totalFetched >= lastPage.total) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });

  const mustPosts = useMemo(
    () => data?.pages?.flatMap((page) => page.posts) || [],
    [data]
  );

  const { ref: observerRef, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return { mustPosts, isPending, isError, observerRef, isFetchingNextPage };
}
