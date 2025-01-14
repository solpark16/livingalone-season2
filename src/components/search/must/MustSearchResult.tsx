"use client";

import { getMustPostOnSearch } from "@/apis/mustpost";
import SearchEmpty from "@/components/common/empty/SearchEmpty";
import IsLoading from "@/components/common/loading/IsLoading";
import MustPostCard from "@/components/mustpost/list/card/MustPostCard";
import { TMustPostList } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

function MustSearchResult({ searchValue }: { searchValue: string }) {
  const {
    data: mustPosts = [],
    isPending,
    isError,
  } = useQuery<TMustPostList[]>({
    queryKey: ["mustPosts", searchValue],
    queryFn: getMustPostOnSearch,
  });
  if (isPending) return <IsLoading />;
  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        데이터를 불러오는데 실패했습니다!
      </div>
    );

  const searchedList = mustPosts.filter(
    (post) =>
      post.item.includes(searchValue) ||
      post.title.includes(searchValue) ||
      post.content.includes(searchValue)
  );
  return (
    <div className="w-full">
      <h4 className="flex items-center gap-[5px] md:gap-[10px] text-lg md:text-[26px] font-[700] mb-[5px] md:mb-[31px] text-gray-6">
        자랑해 자취템{" "}
        <span className="text-main-6">검색 결과 {searchedList.length}건</span>
      </h4>
      {searchedList.length > 0 ? (
        <div className="w-full min-h-screen flex-col items-center justify-center">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-10">
            {searchedList.map((post) => (
              <li key={post.id}>
                <MustPostCard
                  postId={post.id}
                  title={post.title}
                  item={post.item}
                  imgUrl={post.img_url}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <SearchEmpty />
      )}
    </div>
  );
}

export default MustSearchResult;
