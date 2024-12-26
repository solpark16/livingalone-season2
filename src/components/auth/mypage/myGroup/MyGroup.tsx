"use client";

import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import { useGetMyGroup } from "@/hooks/mypage/useGetMyGroup";
import GroupList from "./GroupList";
import Notice from "./Notice";

function MyGroup() {
  const { myGroupPosts, isPending, isError } = useGetMyGroup();

  if (isPending) return <IsLoading />;
  if (isError) return <Error />;

  return (
    <div className="w-full mt-8">
      <Notice />
      {myGroupPosts.length > 0 ? (
        <ul className="w-full md:w-[800px] mx-auto flex flex-col gap-[10px] mt-8">
          {myGroupPosts.map((post) => (
            <li key={post.id} className="flex flex-col gap-[10px]">
              <GroupList post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <Empty content="작성한 공구가 없습니다." />
      )}
    </div>
  );
}

export default MyGroup;
