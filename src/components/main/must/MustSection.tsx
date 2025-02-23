"use client";
import { getMustPostOnMain } from "@/apis/mustpost";
import Button from "@/components/common/button/Button";
import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import MustPostCard from "@/components/mustpost/list/card/MustPostCard";
import { TMainMustPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import MainSectionTitle from "../common/MainSectionTitle";

function MustSection() {
  const {
    data: mustPosts = [],
    isPending,
    isError,
  } = useQuery<TMainMustPost[]>({
    queryKey: ["mustPost"],
    queryFn: getMustPostOnMain,
  });

  if (isPending) return <IsLoading />;

  if (isError) return <Error />;

  return (
    <div className="container mx-auto max-w-full xl:max-w-[1200px] mb-[100px] px-[12px] xl:px-0">
      <MainSectionTitle
        title="자랑해 자취템"
        content="자취에 필요한 다양한 아이템을 자랑하고 추천해보세요"
        link="/mustpost"
      />
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-[12px] gap-y-[40px]">
        {mustPosts.map((post) => (
          <li key={post.id}>
            <MustPostCard
              title={post.title}
              item={post.item}
              imgUrl={post.img_url}
              postId={post.id}
            />
          </li>
        ))}
      </ul>
      <div className="mt-[30px] text-center md:hidden">
        <Button
          bgColor="bg-main-2"
          textColor="text-main-7"
          href="/mustpost"
          content="더 많은 게시물 보기"
        />
      </div>
    </div>
  );
}

export default MustSection;
