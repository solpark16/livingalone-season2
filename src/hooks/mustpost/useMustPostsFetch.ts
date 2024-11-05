import { getMustPostAll, getMustPostbyCategory } from "@/apis/mustpost";
import { useCategoryStore } from "@/zustand/mustStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

export function useMustPostsFetch() {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } = useInfiniteQuery({
    queryKey: ["mustPosts", selectedCategory],
    queryFn: async ({ pageParam = 0 }) => {
      const response =
        selectedCategory === "ALL"
          ? await getMustPostAll(pageParam)
          : await getMustPostbyCategory(pageParam, selectedCategory);
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

  const mustPosts = useMemo(() => data?.pages?.flatMap((page) => page.posts) || [], [data]);

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
