import Like from "@/components/common/Like";
import Label from "@/components/label/Label";
import Image from "next/image";
import Link from "next/link";

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
}: GroupPostCardProps) {
  return (
    <div className="border border-gray-4 hover:border-main-7 rounded-lg overflow-hidden">
      <Link href={`/grouppost/read/${postId}`}>
        <div className="flex">
          <div className="relative w-[50%] max-w-[200px] md:max-w-[232px] shrink-0 aspect-square rounde-r-none overflow-hidden">
            <Image src={imgUrl} alt={title} fill quality={75} className="object-fill rounded-l-[6px]" />
          </div>
          <div className="relative py-[20px] pl-[26px] pr-[20px] w-full bg-white ">
            <div className="flex items-center">
              <span className="font-semibold text-[13px] mr-[6px] text-blue-6">{isFinished ? "종료됨" : "진행중"}</span>
              <div className="text-[13px] text-gray-4">
                <span>{startDate}</span> - <span>{endDate}</span>
              </div>
            </div>
            <span className="block mt-[15px] text-[14px] text-gray-6">냉장고 보관 용기</span>
            <h4 className="mt-[10px] font-bold text-[20px] text-gray-6 line-clamp-2 h-[48px]">{title}</h4>
            <p className="mt-[8px] font-bold text-[14px] text-gray-5">
              <span className="text-red-5">24,000원</span>을 <span className="text-red-5">{peopleNum + 1}명</span>이
              나눠서
            </p>
            <span className="block mt-[5px] text-[20px] text-main-7 font-semibold truncate">
              {price.toLocaleString()}원
            </span>
            <div className="mt-[12px] flex gap-[10px]">
              <Label color="bg-red-1" textColor="text-red-5" name={`${peopleNum - application.length}명 남음`} />
              <Label color="bg-yellow-1" textColor="text-yellow-6" name="배송비 포함" />
            </div>
            <div className="absolute right-[20px] bottom-[20px]">
              <Like postId={postId} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default GroupPostCard;
