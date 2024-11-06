"use client";

import { getGroupPostOnMain } from "@/apis/grouppost";
import Button from "@/components/common/button/Button";
import GroupPostCard from "@/components/grouppost/list/Card/GroupPostCard";
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
    <div className="container mx-auto w-full max-w-[1200px] px-[12px] xl:px-0">
      <MainSectionTitle
        title="같이 사 공구템"
        content="공동구매를 통해 필요한 물품을 저렴한 금액에 구매해보세요"
        link="/grouppost"
      />
      <ul className="grid grid-cols-2 gap-x-[17px] gap-y-[40px] px-[12px] xl:px-0">
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
      <div className="mt-[30px] text-center md:hidden">
        <Button bgColor="bg-main-2" textColor="text-main-7" href="/grouppost" content="더 많은 게시물 보기" />
      </div>
    </div>
  );
}

export default GroupSection;
