"use client";

import { getGroupPostOnSearch } from "@/apis/grouppost";
import SearchEmpty from "@/components/common/empty/SearchEmpty";
import IsLoading from "@/components/common/loading/IsLoading";
import GroupPostCard from "@/components/grouppost/list/Card/GroupPostCard";
import { TGroupPostList } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

function GroupSearchResult({ searchValue }: { searchValue: string }) {
  const {
    data: groupPosts = [],
    isPending,
    isError,
  } = useQuery<TGroupPostList[]>({
    queryKey: ["groupPosts", searchValue],
    queryFn: getGroupPostOnSearch,
  });
  if (isPending) return <IsLoading />;
  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        데이터를 불러오는데 실패했습니다!
      </div>
    );
  const searchedList = groupPosts.filter(
    (post) =>
      post.item.includes(searchValue) ||
      post.title.includes(searchValue) ||
      post.content.includes(searchValue)
  );
  return (
    <div className="w-full mb-[120px]">
      <h4 className="flex items-center gap-[5px] md:gap-[10px] text-lg md:text-[26px] font-[700] mb-[5px] md:mb-[31px] text-gray-6">
        같이 사 공구템{" "}
        <span className="text-main-6">검색 결과 {searchedList.length}건</span>
      </h4>
      {searchedList.length > 0 ? (
        <ul className="w-full grid grid-cols-2 gap-x-3 md:gap-x-8 gap-y-8 md:gap-y-[64px]">
          {searchedList.map((post) => {
            return (
              <li key={post.id}>
                <GroupPostCard
                  application={post.group_applications}
                  title={post.title}
                  price={post.price}
                  peopleNum={post.people_num}
                  isFinished={post.is_finished}
                  imgUrl={post.img_url}
                  startDate={post.start_date}
                  endDate={post.end_date}
                  postId={post.id}
                  item={post.item}
                  isFree={post.is_free}
                  regularPrice={post.regular_price}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <SearchEmpty />
      )}
    </div>
  );
}

export default GroupSearchResult;
