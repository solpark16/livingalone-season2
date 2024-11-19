import ShareButton from "@/components/common/share/ShareButton";
import { WishButton } from "@/components/common/wish/WishButton";
import MustPostAction from "./MustPostAction";
import Contents from "./readpost/Contents";
import ItemInfo from "./readpost/ItemInfo";
import PostImage from "./readpost/PostImage";
import Title from "./readpost/Title";
import UserInfo from "./readpost/UserInfo";
interface ReadPostProps {
  created_at: string;
  title: string;
  content: string;
  item: string;
  price: number;
  location: string;
  img_url: string;
  nickname: string;
  profile_image_url: string;
  name: string;
  postId: string;
  link: string | null;
  userId: string;
  id: string;
}
function ReadPost({
  created_at,
  title,
  content,
  item,
  price,
  location,
  img_url,
  nickname,
  profile_image_url,
  name,
  postId,
  link,
  userId,
  id,
}: ReadPostProps) {
  return (
    <div className="mt-6 md:mt-0 w-full">
      <Title title={title} postId={postId} />
      <UserInfo profile_image_url={profile_image_url} nickname={nickname} created_at={created_at} postId={postId} />
      <PostImage img_url={img_url} link={link} />
      <div className="flex flex-row md:flex-col justify-between border-b border-gray-2 pb-5">
        <ItemInfo item={item} location={location} price={price} name={name} />
      </div>
      <Contents content={content} />
      <div className="flex justify-end text-gray-4 mt-[10px] items-center">
        <WishButton postId={postId} /> ・
        <ShareButton postId={postId} title={title} content={item} imgUrl={img_url} />
        <MustPostAction id={id} userId={userId} />
      </div>
    </div>
  );
}

export default ReadPost;
