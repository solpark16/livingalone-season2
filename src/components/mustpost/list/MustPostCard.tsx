import { WishCount } from "@/components/common/wish/WishCount";
import Image from "next/image";
import Link from "next/link";

interface MustPostCardProps {
  postId: string;
  title: string;
  item: string;
  imgUrl: string;
}

function MustPostCard({ postId, title, item, imgUrl }: MustPostCardProps) {
  return (
    <div className="must_post_card border border-gray-4 rounded-lg hover:border-main-7 box-border overflow-hidden">
      <Link href={`/mustpost/read/${postId}`}>
        <div className="overflow-hidden relative aspect-square rounded-t-lg rounded-b-none">
          <Image
            src={imgUrl}
            alt={item}
            fill
            sizes="(max-width: 1024px) 70vw, 50vw"
            className="object-cover"
            quality={75}
          />
        </div>
        <div className="px-[7px] pt-[5px] pb-[10px] md:px-[16px] md:py-[18px] bg-white">
          <span className="text-[10px] md:text-[12px] text-gray-4">2024.08.18</span>
          <span className="block mt-[5px] text-[10px] md:mt-[10px] md:text-[14px] text-gray-6 truncate">{item}</span>
          <h4 className="mt-[3px] text-[14px] md:mt-[6px] md:text-[20px] font-bold  text-gray-6 truncate">{title}</h4>
          <div className="sub mt-[8px] md:mt-[16px] border-t border-gray-4 pt-[4px] md:pt-[10px] flex flex-col md:flex-row md:justify-between">
            <WishCount postId={postId} />
            <span className="text-[10px] md:text-[14px] text-gray-4">댓글 999+</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MustPostCard;
