"use server";
import { getMustPostDetail } from "@/apis/mustpost";
import Button from "@/components/common/button/Button";
import IsLoading from "@/components/common/loading/IsLoading";
import InnerLayout from "@/components/common/page/InnerLayout";
import { MustPost } from "@/types/types";
import { Suspense } from "react";
import Comments from "../comments/Comments";
import MorePost from "./MorePost";
import ReadPost from "./ReadPost";

type Props = {
  params: { id: string };
};

type TMustPostDetail = {
  profiles: {
    nickname: string;
    profile_image_url: string;
  };
  must_categories: {
    name: string;
  };
} & MustPost;

async function Read({ params }: Props) {
  const { id } = params;
  const data = await getMustPostDetail(id);

  const {
    user_id,
    created_at,
    title,
    content,
    item,
    price,
    category_id,
    location,
    img_url,
    link,
    profiles: { nickname, profile_image_url },
    must_categories: { name },
  } = data as TMustPostDetail;

  return (
    <Suspense fallback={<IsLoading />}>
      <InnerLayout>
        <div className="flex flex-col justify-center items-center">
          <ReadPost
            created_at={created_at}
            title={title}
            content={content}
            item={item}
            price={price}
            location={location}
            img_url={img_url}
            nickname={nickname}
            profile_image_url={profile_image_url}
            name={name}
            postId={id}
            link={link}
            userId={user_id}
            id={id}
          />
          <Comments postId={id} userId={user_id} />
        </div>
      </InnerLayout>
      <MorePost category_id={category_id} category_name={name} id={id} />
      <div className="flex flex-col justify-center items-center mt-[70px] md:mt-[100px]">
        <Button
          href="/mustpost"
          textColor="text-main-7"
          content="목록으로 돌아가기"
          outline="border border-main-7"
        />
      </div>
    </Suspense>
  );
}

export default Read;
