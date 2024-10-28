import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import { useMustFetch } from "@/hooks/mustpost/useMustFetch";
import MustPostCard from "./MustPostCard";

function MustPostList() {
  const { mustPosts, isPending, isError, observerRef, isFetchingNextPage } = useMustFetch();

  if (isPending) return <IsLoading />;

  if (isError) return <Error />;

  return (
    <>
      {mustPosts.length > 0 ? (
        <>
          <div className="w-full min-h-screen flex-col items-center justify-center">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {mustPosts.map((post) => (
                <li key={post.id} className="mb-[34px] md:mb-[64px]">
                  <MustPostCard postId={post.id} title={post.title} item={post.item} imgUrl={post.img_url} />
                </li>
              ))}
            </ul>
          </div>

          <div ref={observerRef} />
          {isFetchingNextPage && <IsLoading />}
        </>
      ) : (
        <Empty />
      )}
    </>
  );
}

export default MustPostList;
