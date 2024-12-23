"use client";
import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import GroupPostCard from "@/components/grouppost/list/Card/GroupPostCard";
import { useGetMyApplyGroup } from "@/hooks/mypage/useGetMyApplyGroup";

function MyApplyGroup() {
  const { myApplyGroupPosts, isPending, isError } = useGetMyApplyGroup();

  if (isPending) return <IsLoading />;
  if (isError) return <Error />;

  return (
    <>
      {myApplyGroupPosts.length > 0 ? (
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-[64px]">
          {myApplyGroupPosts.map((post) => (
            <li key={post.id}>
              <GroupPostCard
                application={post.group_posts.group_applications}
                title={post.group_posts.title}
                price={post.group_posts.price}
                peopleNum={post.group_posts.people_num}
                isFinished={post.group_posts.is_finished}
                imgUrl={post.group_posts.img_url}
                startDate={post.group_posts.start_date}
                endDate={post.group_posts.end_date}
                postId={post.post_id}
                item={post.group_posts.item}
                isFree={post.group_posts.is_free}
                regularPrice={post.group_posts.regular_price}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Empty content="신청한 공구가 없습니다." />
      )}
    </>
  );
}

export default MyApplyGroup;
