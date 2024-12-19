import { NewMustCategoryPost } from "@/apis/mustpost";
import MustPostCard from "../list/card/MustPostCard";

interface MorePostProps {
  category_id: string;
  category_name: string;
  id: string;
}

async function MorePost({
  category_id: postCategoryId,
  category_name,
  id: postId,
}: MorePostProps) {
  const latestPosts = await NewMustCategoryPost(postCategoryId, postId);

  if (!latestPosts?.length) {
    return (
      <div className="flex flex-col justify-center items-center mt-[100px]">
        <h3 className="pb-6 font-bold text-2xl">
          <span className="text-main-7">{category_name} </span>관련 추천템
        </h3>
        <div>해당 카테고리의 최신 게시글이 없습니다 🥹</div>
      </div>
    );
  }

  return (
    <div className="mt-16 md:mt-[100px] w-full">
      <h3 className="mb-[30px] md:mb-[50px] font-bold text-[18px] md:text-[26px] text-black text-center">
        <span className="text-main-7">{category_name}</span> 관련 추천템
      </h3>
      <div className="overflow-x-scroll scrollbar-hide">
        <ul className="w-auto grid grid-cols-2 md:grid-cols-4 gap-[6px] md:gap-[12px]">
          {latestPosts.map((post) => (
            <li key={post.id} className="">
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
    </div>
  );
}

export default MorePost;
