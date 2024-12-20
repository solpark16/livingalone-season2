"use client";
import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import MustPostCard from "@/components/mustpost/list/Card/MustPostCard";

import { useGetMyMust } from "@/hooks/mypage/useGetMyMust";

function MyMust() {
  const { mustPosts, isPending, isError, observerRef, isFetchingNextPage } =
    useGetMyMust();

  if (isPending) return <IsLoading />;
  if (isError) return <Error />;

  return (
    <>
      {mustPosts.length > 0 ? (
        <>
          <div className="w-full min-h-screen flex-col items-center justify-center">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-10">
              {mustPosts.map((post) => (
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
          <div ref={observerRef} />
          {isFetchingNextPage && <IsLoading />}
        </>
      ) : (
        <Empty content="작성한 게시글이 없습니다." />
      )}
    </>
  );
}

export default MyMust;
