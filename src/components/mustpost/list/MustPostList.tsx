import { getMustPostAll, getMustPostbyCategory } from "@/apis/mustpost";
import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import { useCategoryStore } from "@/zustand/mustStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import MustPostCard from "./MustPostCard";

function MustPostList() {
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

  if (isPending) return <IsLoading />;

  if (isError) return <Error />;

  return (
    <>
      {mustPosts.length > 0 ? (
        <div className="w-full min-h-screen flex-col items-center justify-center">
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {mustPosts.map((post) => (
              <li key={post.id} className="mb-[34px] md:mb-[64px]">
                <MustPostCard postId={post.id} title={post.title} item={post.item} imgUrl={post.img_url} />
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center mt-[48px] mb-[137px] md:mt-[79px]">
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="border border-gray-3 py-[7px] px-4 rounded-full font-bold text-gray-3"
              >
                {isFetchingNextPage ? "로딩중..." : "더보기"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
}

export default MustPostList;
