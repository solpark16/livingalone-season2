"use client";

import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import { useGetMyGroup } from "@/hooks/mypage/useGetMyGroup";
import GroupList from "./GroupList";

function MyGroup() {
  const { myGroupPosts, isPending, isError } = useGetMyGroup();

  if (isPending) return <IsLoading />;
  if (isError) return <Error />;

  return (
    <>
      {myGroupPosts.length > 0 ? (
        <ul className="w-[800px] mx-auto flex flex-col gap-[10px]">
          {myGroupPosts.map((post) => (
            <li key={post.id} className="flex flex-col gap-[10px]">
              <GroupList post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <div>내가 쓴 공구가 없습니다.</div>
      )}
    </>
  );
}

export default MyGroup;
