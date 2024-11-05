"use client";

import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import useGroupPostsFetch from "@/hooks/grouppost/useGroupPostsFetch";
import GroupPostCard from "./Card/GroupPostCard";

function GroupPostList() {
  const { isFinished, groupPosts, isFetchingNextPage, observerRef, isPending, isError } = useGroupPostsFetch();

  if (isPending) return <IsLoading />;

  if (isError) return <Error />;

  return (
    <>
      {groupPosts && groupPosts.length ? (
        <>
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-[64px]">
            {groupPosts.map((post) => {
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

          <div ref={observerRef} />
          {isFetchingNextPage && <IsLoading />}
        </>
      ) : isFinished ? (
        <Empty content="종료된 공구템 게시물이 없습니다." />
      ) : (
        <Empty content="진행 중인 공구템 게시물이 없습니다." />
      )}
    </>
  );
}

export default GroupPostList;
