"use client";
import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import { useMustPostsFetch } from "@/hooks/mustpost/useMustPostsFetch";
import MustPostCard from "./Card/MustPostCard";

function MustPostList() {
  const { mustPosts, isPending, isError, observerRef, isFetchingNextPage } =
    useMustPostsFetch();

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
        <Empty content="해당 카테고리에 맞는 게시글이 없습니다." />
      )}
    </>
  );
}

export default MustPostList;
