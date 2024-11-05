import LabelInfo from "../../common/LabelInfo";
import GroupPostWrapper from "./GroupPostWrapper";
import ImageThumb from "./ImageThumb";
import ItemInfo from "./ItemInfo";
import PostTitle from "./PostTitle";
import PriceInfo from "./PriceInfo";
import ProgressInfo from "./ProgressInfo";

interface GroupPostCardProps {
  application: {}[];
  title: string;
  price: number;
  peopleNum: number;
  isFinished: boolean;
  imgUrl: string;
  startDate: string;
  endDate: string;
  postId: string;
  item: string;
  isFree: boolean;
  regularPrice: number;
}

function GroupPostCard({
  application,
  title,
  price,
  peopleNum,
  isFinished,
  imgUrl,
  startDate,
  endDate,
  postId,
  item,
  isFree,
  regularPrice,
}: GroupPostCardProps) {
  return (
    <GroupPostWrapper postId={postId}>
      <ImageThumb imgUrl={imgUrl} title={title} />
      <div className="px-[8px] py-[8px] md:py-[20px] md:pl-[26px] md:pr-[20px] w-full bg-white shrink-0">
        <ProgressInfo isFinished={isFinished} startDate={startDate} endDate={endDate} />
        <ItemInfo item={item} />
        <PostTitle title={title} />
        <PriceInfo regularPrice={regularPrice} price={price} />
        <LabelInfo peopleNum={peopleNum} application={application} isFree={isFree} />
      </div>
    </GroupPostWrapper>
  );
}

export default GroupPostCard;
