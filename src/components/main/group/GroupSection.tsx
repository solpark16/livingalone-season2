"use client";

import { getGroupPostOnMain } from "@/apis/grouppost";
import GroupPostCard from "@/components/grouppost/list/GroupPostCard";
import { TMainGroupPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import MainSectionTitle from "../common/MainSectionTitle";

function GroupSection() {
  const {
    data: groupPosts = [],
    isPending,
    isError,
  } = useQuery<TMainGroupPost[]>({
    queryKey: ["groupPost"],
    queryFn: getGroupPostOnMain,
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center">
        <Image src="/img/loading-spinner.svg" alt="로딩중" width={200} height={200} />
      </div>
    );

  if (isError) return <div className="flex justify-center items-center">에러...</div>;

  return (
    <div className="container mx-auto w-full max-w-[1200px]">
      <MainSectionTitle
        title="같이 사 공구템"
        content="공동구매를 통해 자취에 필요한 물품을 저렴한 금액에 구매해보세요"
        link="/grouppost"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-[17px] gap-y-[40px]">
        {groupPosts.map((post) => {
          return (
            <li key={post.id}>
              <GroupPostCard
                postId={post.id}
                application={post.group_applications}
                title={post.title}
                price={post.price}
                peopleNum={post.people_num}
                isFinished={post.is_finished}
                imgUrl={post.img_url}
                startDate={post.start_date}
                endDate={post.end_date}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GroupSection;
