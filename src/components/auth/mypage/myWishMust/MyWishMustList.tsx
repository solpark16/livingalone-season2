"use client";
import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import MustPostCard from "@/components/mustpost/list/card/MustPostCard";
import { useGetMyWish } from "@/hooks/mypage/useGetMyWish";

function MyWishMustList() {
  const { myWishMustLists, isPending, isError } = useGetMyWish();

  if (isPending) return <IsLoading />;
  if (isError) return <Error />;

  return (
    <div className="w-full min-h-screen flex-col items-center justify-center">
      {myWishMustLists.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-10">
          {myWishMustLists.map((post) => (
            <li key={post.id}>
              <MustPostCard
                postId={post.post_id}
                title={post.must_posts.title}
                item={post.must_posts.item}
                imgUrl={post.must_posts.img_url}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Empty content="찜한 게시글이 없습니다." />
      )}
    </div>
  );
}

export default MyWishMustList;
